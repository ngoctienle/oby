import { ItemWithAttribute } from '@/@types/category.type'

export const CateTag = ({
  data,
  onClickTag
}: {
  data: ItemWithAttribute | undefined
  onClickTag: (newId: number | undefined) => void
}) => {
  return (
    <button
      onClick={() => onClickTag(data?.id)}
      className={`border border-[#C7C7C7] rounded-full p-3 border-dashed hover:border-transparent hover:text-oby-F6F7F8 hover:bg-gradient-to-r from-agr-orange via-agr-mid-orange to-agr-light-orange`}
    >
      <p className='font-medium fs-14 whitespace-nowrap'>{data?.name}</p>
    </button>
  )
}
