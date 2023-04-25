import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import {
  BanknotesIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { Cart } from '@/@types/cart.type'
import { District, Provine, Ward } from '@/@types/geo.type'
import { IBillingAddress } from '@/@types/magento.type'
import { AddressBody, IBodyAddress, IBodyShippingInformation, IPayment } from '@/@types/payment.type'

import { FillPaymentForm, fillPaymentForm } from '@/libs/rules'
import twclsx from '@/libs/twclsx'

import { formatAddress, formatCurrency, generateName, getShippingMethod, mergeArrayItems } from '@/helpers'
import { calculateTotalDiscountPrice, calculateTotalOriginPrice, calculateTotalPrice } from '@/helpers/cart'
import {
  generateProductImageFromMagento,
  getCost,
  getDiscount,
  getSKUListProductAsString,
  getTotalQuantity,
  isHaveDiscount
} from '@/helpers/product'

import GeoAPI from '@/apis/geo/geo.api'
import cartApi from '@/apis/magento/cart.api'
import paymentApi from '@/apis/magento/payment.api'
import productApi from '@/apis/magento/product.api'

import { cacheTime } from '@/constants/config.constant'

import Input from '@/components/Input'
import { OBYButton, OBYImage } from '@/components/UI/Element'
import { OBYLocationIcon } from '@/components/UI/OBYIcons'

interface IOrderPage {
  userToken: string
  cartData: Cart
  listSKU: string
  paymentMethod: IPayment
  provines: Provine[]
  billingData: IBillingAddress
}

interface SelectedPlace {
  name: string
  code?: number
}

interface CalculateOrder {
  grand_total: number
  shipping_amount: number
}

interface SeletedShipping {
  name?: string
  value?: number
}

export default function OrderPage({ cartData, listSKU, paymentMethod, provines, userToken, billingData }: IOrderPage) {
  const [billing, setBilling] = useState<IBillingAddress | null>(billingData)
  const [orderCalculate, setOrderCalculate] = useState<CalculateOrder>()

  const [shipMethod, setShipMethod] = useState<boolean | string>(false)
  const [selectedMethod, setSelectedMethod] = useState<SeletedShipping>()
  const [selected, setSelected] = useState<string | boolean>(false)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMethodOpen, setIsMethodOpen] = useState<boolean>(false)

  const [isProvineOpen, setIsProvineOpen] = useState<boolean>(false)
  const [selectedProvine, setSelectedProvine] = useState<SelectedPlace>()
  const [searchProvine] = useState<string>('')

  const [isDistrictOpen, setIsDistrictOpen] = useState<boolean>(false)
  const [districtArr, setDistrictArr] = useState<District[]>()
  const [selectedDistrict, setSelectedDistrict] = useState<SelectedPlace>()

  const [isWardOpen, setIsWardOpen] = useState<boolean>(false)
  const [wardArr, setWardArr] = useState<Ward[]>()
  const [selectedWard, setSelectedWard] = useState<SelectedPlace>()

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm<FillPaymentForm>({
    resolver: yupResolver(fillPaymentForm)
  })

  const { data: productData } = useQuery({
    queryKey: ['productInCart'],
    queryFn: () => productApi.GetListProductByListSKU(listSKU),
    staleTime: cacheTime.halfHours
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: provineSearchData } = useQuery({
    queryKey: ['provineSelectedSearch', selectedProvine?.name],
    queryFn: () => selectedProvine && GeoAPI.SearchProvine(selectedProvine.name),
    enabled: !!selectedProvine?.name && !selectedProvine?.code,
    onSuccess: (data) => {
      setSelectedProvine((prev) => ({ ...prev, code: data?.data[0].code }))
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: districtSearchData } = useQuery({
    queryKey: ['districtSelectedSearch', selectedDistrict?.name],
    queryFn: () => selectedDistrict && GeoAPI.SearchDistrict(selectedDistrict.name),
    enabled: !!selectedDistrict?.name && !selectedDistrict.code,
    onSuccess: (data) => {
      setSelectedDistrict((prev) => ({ ...prev, code: data?.data[0].code }))
    }
  })

  const { data: districtsData } = useQuery({
    queryKey: ['districts', selectedProvine?.code],
    queryFn: () => GeoAPI.GetDistrict(selectedProvine?.code ?? 0),
    staleTime: cacheTime.fiveMinutes,
    enabled: Boolean(selectedProvine?.code)
  })

  const { data: wardsData } = useQuery({
    queryKey: ['districts', selectedDistrict?.code],
    queryFn: () => GeoAPI.GetWard(selectedDistrict?.code ?? 0),
    staleTime: cacheTime.fiveMinutes,
    enabled: !!selectedDistrict?.code
  })

  const bodyEstimate = useMemo(() => {
    if (billing?.city) {
      const { email, firstname, lastname, telephone, street, city, region, country_id, postcode } = billing
      return {
        email,
        firstname,
        lastname,
        telephone,
        street,
        city,
        region,
        country_id,
        postcode
      }
    }
  }, [billing])

  const { data: EstimateShippingRes } = useQuery({
    queryKey: ['estimateShippingFee', billing?.city],
    queryFn: () =>
      paymentApi.EstimateShippingFeeByAddressId(userToken as string, { address: bodyEstimate as AddressBody }),
    enabled: Boolean(billing?.city),
    staleTime: cacheTime.fiveMinutes
  })

  const setAddressAndBillingMutation = useMutation({
    mutationFn: (body: IBodyShippingInformation) => paymentApi.ShippingInformation(userToken as string, body)
  })

  useEffect(() => {
    if (districtsData) {
      setDistrictArr(districtsData.data.districts)
    }
    if (wardsData) {
      setWardArr(wardsData.data.wards)
    }
    if (billing?.city && billing?.region && billing?.street.length > 0) {
      if (!selectedProvine && !selectedDistrict && !selectedWard) {
        setSelectedProvine({ name: billing.city })
        setSelectedDistrict({ name: billing.region })
        setSelectedWard({ name: billing.street[1] })
      }
    }
  }, [districtsData, wardsData, selectedProvine, selectedDistrict, selectedWard, billing])

  const initializeData = useMemo(() => {
    const productInCart = productData && productData.data

    if (productInCart && cartData) {
      return mergeArrayItems(cartData.items, productInCart)
    }

    return null
  }, [cartData, productData])

  const handleSelectProvine = useCallback(
    (name: string, code: number) => {
      setSelectedProvine({
        name,
        code
      })
      clearErrors('provine')
      setValue('district', '')
      setValue('ward', '')

      setSelectedDistrict(undefined)
      setSelectedWard(undefined)
      setDistrictArr(undefined)
      setWardArr(undefined)
      setIsProvineOpen(false)
    },
    [clearErrors, setValue]
  )
  const handleSelectDistrict = useCallback(
    (name: string, code: number) => {
      setSelectedDistrict({
        name,
        code
      })
      clearErrors('district')
      setValue('ward', '')

      setSelectedWard(undefined)
      setWardArr(undefined)

      setIsDistrictOpen(false)
    },
    [clearErrors, setValue]
  )
  const handleSelectWard = useCallback(
    (name: string, code: number) => {
      setSelectedWard({
        name,
        code
      })
      clearErrors('ward')

      setIsWardOpen(false)
    },
    [clearErrors]
  )

  const filteredProvine = useMemo(() => {
    const searchRegex = new RegExp(
      `^[\\p{L}0-9\\s]*${searchProvine
        .trim()
        .toLowerCase()
        .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}[\\p{L}0-9\\s]*$`,
      'iu'
    )
    return provines.filter((provine) => {
      return searchRegex.test(provine.name)
    })
  }, [provines, searchProvine])

  const onSubmit = handleSubmit(async (data) => {
    const { address, district, provine, email, phone, fullname, ward } = data
    const [firstname, lastname] = generateName(fullname)
    const body: IBodyAddress = {
      address: {
        email,
        firstname: firstname as string,
        lastname: lastname as string,
        telephone: phone,
        country_id: 'VN',
        city: provine,
        street: [address, ward],
        region: district,
        postcode: 'OBYCode'
      }
    }
    try {
      await paymentApi.SetBillingAddress(userToken, body)
      const { data: billingData } = await paymentApi.GetBillingAddress(userToken)
      setBilling(billingData)
      setIsOpen(false)
      setOrderCalculate(undefined)
      setSelectedMethod(undefined)
    } catch (error) {
      toast.error('Có lỗi xảy ra!')
    }
  })

  const addressInformation = useMemo(() => {
    if (billing) {
      return formatAddress(billing)
    }
    return null
  }, [billing])

  const setAddressAndBilling = () => {
    const body: IBodyShippingInformation = {
      addressInformation: {
        shipping_address: {
          email: billing?.email as string,
          firstname: billing?.firstname as string,
          lastname: billing?.lastname as string,
          telephone: billing?.telephone as string,
          city: billing?.city as string,
          country_id: billing?.country_id as string,
          region: billing?.region as string,
          street: billing?.street as string[],
          postcode: billing?.postcode as string
        },
        shipping_carrier_code: shipMethod as string,
        shipping_method_code: shipMethod as string
      }
    }

    if (shipMethod) {
      setAddressAndBillingMutation.mutate(body, {
        onSuccess: (data) => {
          const totalSegments = data.data.totals.total_segments
          const selected = getShippingMethod(totalSegments)
          setOrderCalculate({
            grand_total: data.data.totals.grand_total,
            shipping_amount: data.data.totals.shipping_amount
          })
          setIsMethodOpen(false)
          setSelectedMethod(selected)
        },
        onError: () => {
          toast.error('Vui lòng thử lại!')
        }
      })
    }
  }

  return (
    <div className='@992:pt-7.5 pt-2 min-h-[50%]'>
      <div className='container'>
        {/* Processing */}
        <div className='flex items-center max-w-[426px] justify-between mx-auto relative'>
          <div className='absolute w-[80%] h-[1px] top-[35%] left-1/2 -translate-x-1/2 -z-10 bg-oby-DFDFDF' />
          <div className='absolute w-[40%] h-[1px] top-[35%] left-7 -z-9 bg-oby-primary' />
          <div className='flex flex-col items-center @768:gap-1.5 gap-1 relative z-1'>
            <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-E4FBDB'>
              <ShoppingBagIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-green' />
            </div>
            <p className='@768:fs-14 fs-12 text-oby-green font-semibold'>Giỏ hàng</p>
          </div>
          <div className='flex flex-col items-center gap-1.5 relative z-1'>
            <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-E4FBDB'>
              <BanknotesIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-green' />
            </div>
            <p className='@768:fs-14 fs-12 text-oby-green font-semibold'>Tiến hành đặt hàng</p>
          </div>
          <div className='flex flex-col items-center gap-1.5 relative z-1'>
            <div className='@768:w-[56px] w-10 flex items-center justify-center @768:h-[56px] h-10 rounded-full bg-oby-F6F7F8'>
              <CheckIcon className='@768:w-8 @768:h-8 w-6 h-6 text-oby-9A9898' />
            </div>
            <p className='@768:fs-14 fs-12 text-oby-9A9898'>Hoàn thành</p>
          </div>
        </div>

        {/* Content */}
        <div className='@992:mt-7.5 mt-4 grid grid-cols-12 @992:gap-10 gap-5'>
          <div className='@992:col-span-8 col-span-12'>
            {/* Information User */}
            <div className='border border-oby-DFDFDF rounded-2.5 bg-white p-4'>
              <div className='flex items-center justify-between pb-3.5 border-b border-b-oby-DFDFDF mb-3.5'>
                <p className='fs-18 font-bold text-oby-green'>Thông tin giao hàng</p>
                <OBYButton onClick={() => setIsOpen(true)}>
                  <span className='fs-16 text-oby-primary'>Thay đổi</span>
                  <ChevronRightIcon className='text-oby-primary w-5 h-5' />
                </OBYButton>
              </div>
              {}
              {addressInformation ? (
                <>
                  <p className='fs-16 font-semibold flex items-center'>
                    <OBYLocationIcon className='w-6 h-6 mr-1 text-oby-676869' />
                    <span>{addressInformation.nameAndPhone}</span>
                  </p>
                  <p className='fs-16 mt-2'>{addressInformation.address}</p>
                </>
              ) : (
                <p className='fs-16 text-oby-9A9898'>Vui lòng nhập thông tin giao hàng để tiếp tục</p>
              )}
            </div>
            <Transition show={isOpen} as={Fragment}>
              <Dialog as='div' className='relative z-10' onClose={() => setIsOpen(false)}>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='fixed inset-0 bg-black/30' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                  <div className='flex min-h-full items-center justify-center p-4 text-center'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0 scale-95'
                      enterTo='opacity-100 scale-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100 scale-100'
                      leaveTo='opacity-0 scale-95'
                    >
                      <Dialog.Panel className='w-full max-w-xl h-[730px] transform overflow-hidden rounded-2.5 bg-white px-6 py-7.5 text-left align-middle shadow-xl transition-all'>
                        <Dialog.Title as='h3' className='fs-18 font-semibold text-center'>
                          Thông tin giao hàng
                        </Dialog.Title>
                        <XMarkIcon
                          className='w-6 h-6 text-oby-676869 absolute top-7.5 right-6 cursor-pointer'
                          type='button'
                          onClick={() => setIsOpen(false)}
                        />
                        <form noValidate className='mt-6 overflow-y-auto max-h-[630px]' onSubmit={onSubmit}>
                          <p className='fs-16 text-oby-green font-semibold'>Liên hệ</p>
                          <Controller
                            name='fullname'
                            control={control}
                            defaultValue={(addressInformation && addressInformation.fullname) || undefined}
                            render={({ field }) => (
                              <Input
                                type='text'
                                placeholder='Họ và tên'
                                className='mt-3'
                                value={field.value}
                                onChange={field.onChange}
                                errorMessage={errors.fullname?.message}
                                register={register}
                              />
                            )}
                          />
                          <Controller
                            name='email'
                            control={control}
                            defaultValue={(billing && billing.email) || undefined}
                            render={({ field }) => (
                              <Input
                                type='email'
                                placeholder='Địa chỉ email'
                                className='mt-3'
                                value={field.value}
                                onChange={field.onChange}
                                errorMessage={errors.email?.message}
                                register={register}
                              />
                            )}
                          />
                          <Controller
                            name='phone'
                            control={control}
                            defaultValue={(billing && billing.telephone) || undefined}
                            render={({ field }) => (
                              <Input
                                type='text'
                                placeholder='Số điện thoại'
                                className='mt-3'
                                value={field.value}
                                onChange={field.onChange}
                                errorMessage={errors.phone?.message}
                                register={register}
                              />
                            )}
                          />

                          <p className='fs-16 mt-5 text-oby-green font-semibold'>Địa chỉ</p>
                          <Input
                            name='provine'
                            type='text'
                            className='mt-3'
                            classNameInput='cursor-pointer'
                            placeholder='Tỉnh/Thành phố'
                            defaultValue={billing?.city ? billing.city : ''}
                            value={(selectedProvine?.name && selectedProvine.name) || ''}
                            readOnly
                            isRead
                            onClick={() => setIsProvineOpen(true)}
                            errorMessage={errors.provine?.message}
                            register={register}
                          />
                          {/* Modal Provine */}
                          <Transition show={isProvineOpen} as={Fragment}>
                            <Dialog as='div' className='relative z-[11]' onClose={() => setIsProvineOpen(false)}>
                              <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0'
                                enterTo='opacity-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                              >
                                <div className='fixed inset-0 bg-black/30' />
                              </Transition.Child>

                              <div className='fixed inset-0 overflow-y-auto'>
                                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                                  <Transition.Child
                                    as={Fragment}
                                    enter='ease-out duration-300'
                                    enterFrom='opacity-0 scale-95'
                                    enterTo='opacity-100 scale-100'
                                    leave='ease-in duration-200'
                                    leaveFrom='opacity-100 scale-100'
                                    leaveTo='opacity-0 scale-95'
                                  >
                                    <Dialog.Panel className='w-[576px] relative max-w-xl h-[730px] transform overflow-hidden rounded-2.5 bg-white px-6 py-7.5 text-left align-middle shadow-xl transition-all'>
                                      <Dialog.Title as='h3' className='fs-18 font-semibold text-center'>
                                        Tỉnh/Thành phố
                                      </Dialog.Title>
                                      <ChevronLeftIcon
                                        className='w-6 h-6 text-oby-676869 absolute top-7.5 left-6 cursor-pointer'
                                        type='button'
                                        onClick={() => setIsProvineOpen(false)}
                                      />
                                      <div className='my-6 flex flex-col items-center'>
                                        <p>Search TODO</p>
                                      </div>
                                      <div className='overflow-y-scroll max-h-[550px]'>
                                        <p className='fs-14 mb-1.5'>Tỉnh/Thành phố</p>
                                        {filteredProvine.map((provine, index) => (
                                          <div
                                            className='py-2.5 border-b cursor-pointer border-b-DFDFDF flex items-center justify-between'
                                            key={provine.codename}
                                            tabIndex={index}
                                            onClick={() => handleSelectProvine(provine.name, provine.code)}
                                          >
                                            <p
                                              className={twclsx(
                                                'fs-16',
                                                selectedProvine?.name === provine.name && 'text-oby-primary'
                                              )}
                                            >
                                              {provine.name}
                                            </p>
                                            {selectedProvine?.name === provine.name && (
                                              <CheckIcon className='w-6 h-6 text-oby-primary' />
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </Dialog.Panel>
                                  </Transition.Child>
                                </div>
                              </div>
                            </Dialog>
                          </Transition>
                          {/* End Modal Provine */}
                          <Input
                            type='text'
                            name='district'
                            className='mt-3'
                            classNameInput='cursor-pointer'
                            placeholder='Quận/Huyện'
                            defaultValue={(billing?.region && billing.region) || ''}
                            value={selectedDistrict?.name || ''}
                            disabled={selectedProvine?.name ? false : true}
                            readOnly
                            isRead
                            onClick={() => setIsDistrictOpen(true)}
                            errorMessage={errors.district?.message}
                            register={register}
                          />
                          {/* Modal District */}
                          {districtArr && (
                            <Transition show={isDistrictOpen} as={Fragment}>
                              <Dialog as='div' className='relative z-[11]' onClose={() => setIsDistrictOpen(false)}>
                                <Transition.Child
                                  as={Fragment}
                                  enter='ease-out duration-300'
                                  enterFrom='opacity-0'
                                  enterTo='opacity-100'
                                  leave='ease-in duration-200'
                                  leaveFrom='opacity-100'
                                  leaveTo='opacity-0'
                                >
                                  <div className='fixed inset-0 bg-black/30' />
                                </Transition.Child>

                                <div className='fixed inset-0 overflow-y-auto'>
                                  <div className='flex min-h-full items-center justify-center p-4 text-center'>
                                    <Transition.Child
                                      as={Fragment}
                                      enter='ease-out duration-300'
                                      enterFrom='opacity-0 scale-95'
                                      enterTo='opacity-100 scale-100'
                                      leave='ease-in duration-200'
                                      leaveFrom='opacity-100 scale-100'
                                      leaveTo='opacity-0 scale-95'
                                    >
                                      <Dialog.Panel className='w-[576px] relative max-w-xl h-[730px] transform overflow-hidden rounded-2.5 bg-white px-6 py-7.5 text-left align-middle shadow-xl transition-all'>
                                        <Dialog.Title as='h3' className='fs-18 font-semibold text-center'>
                                          Quận/Huyện
                                        </Dialog.Title>
                                        <ChevronLeftIcon
                                          className='w-6 h-6 text-oby-676869 absolute top-7.5 left-6 cursor-pointer'
                                          type='button'
                                          onClick={() => setIsDistrictOpen(false)}
                                        />
                                        <div className='my-6 flex flex-col items-center'>
                                          <p className='fs-16 text-oby-676869'>Todo Input</p>
                                        </div>
                                        <div className='overflow-y-scroll max-h-[550px]'>
                                          <p className='fs-14 mb-1.5'>Quận/Huyện</p>
                                          {districtArr.map((district, index) => (
                                            <div
                                              className='py-2.5 border-b cursor-pointer border-b-DFDFDF flex items-center justify-between'
                                              key={district.codename}
                                              tabIndex={index}
                                              onClick={() => handleSelectDistrict(district.name, district.code)}
                                            >
                                              <p
                                                className={twclsx(
                                                  'fs-16',
                                                  selectedDistrict?.name === district.name && 'text-oby-primary'
                                                )}
                                              >
                                                {district.name}
                                              </p>
                                              {selectedDistrict?.name === district.name && (
                                                <CheckIcon className='w-6 h-6 text-oby-primary' />
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </Dialog.Panel>
                                    </Transition.Child>
                                  </div>
                                </div>
                              </Dialog>
                            </Transition>
                          )}
                          {/* End Modal District */}
                          <Input
                            type='text'
                            name='ward'
                            className='mt-3'
                            classNameInput='cursor-pointer'
                            placeholder='Phường/Xã'
                            defaultValue={billing && billing.street.length > 0 ? billing.street[1] : ''}
                            value={selectedWard?.name || ''}
                            disabled={selectedDistrict?.name ? false : true}
                            readOnly
                            isRead
                            onClick={() => setIsWardOpen(true)}
                            errorMessage={errors.ward?.message}
                            register={register}
                          />
                          {/* Ward Modal */}
                          {wardArr && (
                            <Transition show={isWardOpen} as={Fragment}>
                              <Dialog as='div' className='relative z-[11]' onClose={() => setIsWardOpen(false)}>
                                <Transition.Child
                                  as={Fragment}
                                  enter='ease-out duration-300'
                                  enterFrom='opacity-0'
                                  enterTo='opacity-100'
                                  leave='ease-in duration-200'
                                  leaveFrom='opacity-100'
                                  leaveTo='opacity-0'
                                >
                                  <div className='fixed inset-0 bg-black/30' />
                                </Transition.Child>

                                <div className='fixed inset-0 overflow-y-auto'>
                                  <div className='flex min-h-full items-center justify-center p-4 text-center'>
                                    <Transition.Child
                                      as={Fragment}
                                      enter='ease-out duration-300'
                                      enterFrom='opacity-0 scale-95'
                                      enterTo='opacity-100 scale-100'
                                      leave='ease-in duration-200'
                                      leaveFrom='opacity-100 scale-100'
                                      leaveTo='opacity-0 scale-95'
                                    >
                                      <Dialog.Panel className='w-[576px] relative max-w-xl h-[730px] transform overflow-hidden rounded-2.5 bg-white px-6 py-7.5 text-left align-middle shadow-xl transition-all'>
                                        <Dialog.Title as='h3' className='fs-18 font-semibold text-center'>
                                          Phường/Xã
                                        </Dialog.Title>
                                        <ChevronLeftIcon
                                          className='w-6 h-6 text-oby-676869 absolute top-7.5 left-6 cursor-pointer'
                                          type='button'
                                          onClick={() => setIsWardOpen(false)}
                                        />
                                        <div className='my-6 flex flex-col items-center'>
                                          <p className='fs-16 text-oby-676869'>Todo Input</p>
                                        </div>
                                        <div className='overflow-y-scroll max-h-[550px]'>
                                          <p className='fs-14 mb-1.5'>Phường/Xã</p>
                                          {wardArr.map((ward, index) => (
                                            <div
                                              className='py-2.5 border-b cursor-pointer border-b-DFDFDF flex items-center justify-between'
                                              key={ward.codename}
                                              tabIndex={index}
                                              onClick={() => handleSelectWard(ward.name, ward.code)}
                                            >
                                              <p
                                                className={twclsx(
                                                  'fs-16',
                                                  selectedWard?.name === ward.name && 'text-oby-primary'
                                                )}
                                              >
                                                {ward.name}
                                              </p>
                                              {selectedWard?.code === ward.code && (
                                                <CheckIcon className='w-6 h-6 text-oby-primary' />
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      </Dialog.Panel>
                                    </Transition.Child>
                                  </div>
                                </div>
                              </Dialog>
                            </Transition>
                          )}
                          <Input
                            type='text'
                            placeholder='Địa chỉ cụ thể (số nhà, tên đường,...)'
                            name='address'
                            className='mt-3'
                            defaultValue={(billing && billing.street[0]) || undefined}
                            errorMessage={errors.address?.message}
                            register={register}
                          />
                          <p className='fs-16 mt-5 text-oby-green font-semibold'>Ghi chú (nếu có)</p>
                          <Input
                            type='text'
                            placeholder='Ghi chú đơn hàng'
                            name='note'
                            className='mt-3'
                            errorMessage={errors.note?.message}
                            register={register}
                          />
                          <OBYButton
                            type='submit'
                            className='mt-6 rounded-4 border border-transparent bg-oby-primary py-2.5 fs-16 text-white w-full'
                          >
                            Xác nhận
                          </OBYButton>
                        </form>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

            {/* Shipping Method & Fee */}
            <div className='border border-oby-DFDFDF rounded-2.5 bg-white p-4 mt-5'>
              <div className='flex items-center justify-between pb-3.5 border-b border-b-oby-DFDFDF mb-3.5'>
                <p className='fs-18 font-bold text-oby-green'>Phương thức vận chuyển</p>
                <OBYButton
                  onClick={() => setIsMethodOpen(true)}
                  disabled={!billing?.city && !EstimateShippingRes}
                  className='disabled:cursor-not-allowed'
                >
                  <span className='fs-16 text-oby-primary'>Thay đổi</span>
                  <ChevronRightIcon className='text-oby-primary w-5 h-5' />
                </OBYButton>
                <Transition show={isMethodOpen} as={Fragment}>
                  <Dialog as='div' className='relative z-10' onClose={() => setIsMethodOpen(false)}>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='fixed inset-0 bg-black/30' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                      <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                          as={Fragment}
                          enter='ease-out duration-300'
                          enterFrom='opacity-0 scale-95'
                          enterTo='opacity-100 scale-100'
                          leave='ease-in duration-200'
                          leaveFrom='opacity-100 scale-100'
                          leaveTo='opacity-0 scale-95'
                        >
                          <Dialog.Panel className='w-full relative max-w-md transform overflow-hidden rounded-2.5 bg-white px-6 py-7.5 text-left align-middle shadow-xl transition-all'>
                            <Dialog.Title as='h3' className='fs-18 font-semibold text-center'>
                              Phương thức vận chuyển
                            </Dialog.Title>
                            <XMarkIcon
                              className='w-6 h-6 text-oby-676869 absolute top-7.5 right-6 cursor-pointer'
                              type='button'
                              onClick={() => setIsMethodOpen(false)}
                            />
                            <RadioGroup value={shipMethod} onChange={setShipMethod}>
                              <div className='flex flex-col gap-3 justify-between mt-6'>
                                {EstimateShippingRes?.data?.map((plan) => (
                                  <RadioGroup.Option
                                    key={plan.carrier_code}
                                    value={plan.carrier_code}
                                    className={({ checked }) =>
                                      twclsx(
                                        `rounded-4 border cursor-pointer flex items-center justify-between transition-colors py-3 px-4`,
                                        checked ? 'bg-oby-E4FBDB border-oby-green' : 'border-oby-DFDFDF bg-white'
                                      )
                                    }
                                  >
                                    {({ checked }) => {
                                      return (
                                        <>
                                          <RadioGroup.Label as='p' className={checked ? 'text-oby-green' : ''}>
                                            {plan.method_title}
                                          </RadioGroup.Label>
                                          <RadioGroup.Description as='p' className={checked ? 'text-oby-green' : ''}>
                                            {formatCurrency(plan.amount)}
                                          </RadioGroup.Description>
                                        </>
                                      )
                                    }}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                            <OBYButton
                              onClick={setAddressAndBilling}
                              className='mt-6 rounded-4 border border-transparent bg-oby-primary py-2.5 fs-16 text-white w-full'
                            >
                              Xác nhận
                            </OBYButton>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
              {selectedMethod ? (
                <div className='flex items-center justify-between'>
                  <p className='font-semibold fs-16'>{selectedMethod.name}</p>
                  <p className='font-semibold fs-16'>{formatCurrency(selectedMethod.value as number)}</p>
                </div>
              ) : (
                <p className='fs-16 text-oby-9A9898'>
                  Vui lòng chọn Thông tin giao hàng để xem danh sách phương thức vận chuyển
                </p>
              )}
            </div>
            <div className='mt-5'>
              {initializeData &&
                initializeData.map((item) => (
                  <div
                    className='@992:p-5 py-3.5 px-4 border border-oby-DFDFDF bg-white rounded-tl-4 rounded-br-4 first:mt-0 @992:mt-4 mt-3 flex @992:gap-5 gap-3.5'
                    key={item.item_id}
                  >
                    <div className='flex-shrink-0 relative w-[150px] h-[100px] bg-white rounded-tl-4 rounded-br-4 overflow-hidden'>
                      <OBYImage
                        src={generateProductImageFromMagento(item.custom_attributes)}
                        alt={item.name}
                        title={item.name}
                        display='responsive'
                        className='object-cover'
                      />
                    </div>
                    <div className='w-full'>
                      <h2 className='@992:fs-16 fs-14 @992:line-clamp-1 line-clamp-2'>{item.name}</h2>
                      <div className='flex items-center gap-2.5 mt-2'>
                        {isHaveDiscount(item.custom_attributes) ? (
                          <>
                            <p className='@992:fs-16 fs-14 font-semibold'>{getDiscount(item.custom_attributes)}</p>
                            <p className='@992:fs-14 fs-12 line-through text-oby-676869'>
                              {getCost(item.custom_attributes)}
                            </p>
                          </>
                        ) : (
                          <p className='@992:fs-16 fs-14 font-semibold'>{formatCurrency(item.price)}</p>
                        )}
                      </div>
                      <div className='flex items-center justify-between mt-5'>
                        <p className='fs-16 text-oby-primary'>x {item.qty}</p>
                        <p className='fs-16'>
                          Số tiền: <span className='font-semibold'>{formatCurrency(item.price * item.qty)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='@992:col-span-4 col-span-12 bg-transparent'>
            <div className=' bg-white rounded-tl-4 rounded-br-4 bsd'>
              <div className='@992:pt-5 pt-4 @992:pb-4 pb-3 border-b border-b-oby-DFDFDF'>
                <div className='@992:px-6 px-4'>
                  <p className='@992:fs-18 fs-16 mb-4 font-bold text-oby-green'>Phương thức thanh toán</p>
                  <RadioGroup value={selected} onChange={setSelected}>
                    <div className='flex items-center gap-4 justify-between'>
                      {paymentMethod.map((plan) => (
                        <RadioGroup.Option
                          key={plan.title}
                          value={plan.code}
                          className={({ checked }) =>
                            twclsx(
                              `rounded-4 border relative h-[50px] w-1/2 cursor-pointer flex items-center justify-center transition-colors`,
                              checked ? 'bg-oby-E4FBDB border-oby-green' : 'border-oby-DFDFDF bg-white'
                            )
                          }
                        >
                          {({ checked }) => (
                            <>
                              <RadioGroup.Label as='div'>
                                {plan.code === 'momo' && (
                                  <OBYImage
                                    src='/images/payment-momo.png'
                                    width={36}
                                    height={36}
                                    quality={100}
                                    alt={plan.title}
                                    title={plan.title}
                                  />
                                )}
                                {plan.code === 'cashondelivery' && (
                                  <BanknotesIcon
                                    className={twclsx(
                                      '@768:w-9.5 @768:h-9.5 w-6 h-6',
                                      checked ? 'text-oby-green' : 'text-oby-9A9898'
                                    )}
                                  />
                                )}
                              </RadioGroup.Label>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className='@992:mt-4 mt-3 @992:px-6 px-4 @992:pb-5 pb-4'>
                <p className='@992:fs-18 fs-16 mb-4 font-bold text-oby-green'>Tổng giỏ hàng</p>
                <div className='flex items-center justify-between'>
                  <p className='@992:fs-16 fs-14'>Tạm tính ({initializeData && getTotalQuantity(initializeData)})</p>
                  <p className='@992:fs-16 fs-14 text-end'>
                    {initializeData && calculateTotalOriginPrice(initializeData)}
                  </p>
                </div>
                {initializeData && calculateTotalDiscountPrice(initializeData) && (
                  <div className='flex items-center justify-between mt-3'>
                    <p className='@992:fs-16 fs-14'>Giảm giá sản phẩm</p>
                    <p className='@992:fs-16 fs-14 text-end text-oby-orange'>
                      {calculateTotalDiscountPrice(initializeData)}
                    </p>
                  </div>
                )}
                {orderCalculate && (
                  <div className='flex items-center justify-between mt-3'>
                    <p className='@992:fs-16 fs-14'>Phí vận chuyển</p>
                    <p className='@992:fs-16 fs-14 text-end'>{formatCurrency(orderCalculate.shipping_amount)}</p>
                  </div>
                )}
                <div className='mt-3 pt-3 border-t border-t-oby-DFDFDF'>
                  <div className='flex justify-between'>
                    <div className='flex flex-col'>
                      <p className='@992:fs-16 fs-14 font-semibold'>Thành tiền</p>
                      <p className='@992:fs-14 fs-12 text-oby-9A9898'>(Đã bao gồm VAT)</p>
                    </div>
                    <p className='@992:fs-18 fs-16 font-semibold'>
                      {initializeData && !orderCalculate && calculateTotalPrice(initializeData)}
                      {orderCalculate && formatCurrency(orderCalculate.grand_total)}
                    </p>
                  </div>
                </div>
                <OBYButton className='@992:mt-5 mt-3 bg-oby-primary text-white w-full py-2.5 rounded-4'>
                  Tiếp tục
                </OBYButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IOrderPage> = async (context) => {
  const userToken = context.req.cookies.token

  const { data } = await cartApi.GetCart(userToken as string)
  const { data: paymentMethod } = await paymentApi.GetPaymentMethod(userToken as string)

  const { data: provines } = await GeoAPI.GetProvine()

  const listSKU = getSKUListProductAsString(data.items)

  return {
    props: {
      cartData: data,
      listSKU,
      paymentMethod,
      provines,
      userToken: userToken as string,
      billingData: data.billing_address
    }
  }
}