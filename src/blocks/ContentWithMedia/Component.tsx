import type { ContentWithMedia as ContentWithMediaProps } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@/components/RichText'

type Props = {
  className?: string
} & ContentWithMediaProps

export const ContentWithMedia: React.FC<Props> = (block) => {
  return <section className={'grid grid-cols-12 gap-4 m-4 p-4 bg-emerald-400 rounded-2xl'}>
    {block.content && <RichText data={block.content} className={`col-span-3 ${block.textPosition === 'Right' ? `order-last` : `order-first`}`} />}
    {block.image && typeof block.image !== 'string' &&
      <Image src={block.image.thumbnailURL || ``} alt={block.image.alt || ``} className={'col-span-9'}
             width={block.image.width || 640} height={block.image.height || 360}
      />}
  </section>

}
