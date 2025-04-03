import type { ContentWithMedia as ContentWithMediaProps } from '@/payload-types'
import Image from 'next/image'
import {RichText} from '@/components/RichText'
import { LoaderCircle } from 'lucide-react'

type Props = {
  className?: string
} & ContentWithMediaProps

export const ContentWithMedia: React.FC<Props> = (block) => {

  const firstLetter = `first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900`

    return <div className={`print:hidden`}>
      <div className={`flex justify-center p-4`}>
        <ul role={"list"} className={`sm:grid sm:grid-cols-2 md:grid-cols-4 md-gap-3 list-disc marker:text-emerald-400`}>
          <li>Get groceries</li>
          <li>Make dinner</li>
          <li>Stream live coding session</li>
        </ul>
      </div>
      <LoaderCircle className={`motion-safe:animate-spin`} />
      <section
        className="group grid grid-cols-12 gap-4 m-4 p-4 bg-emerald-400 rounded-2xl dark:bg-emerald-600 hover:not-dark:bg-black">
        {block.content && <RichText
          className={`${firstLetter} dark:selection:bg-white dark:selection:text-black first-line:font-serif group-hover:text-emerald-50 md:col-span-3! col-span-12 order-last ${block.textPosition === 'Right' ? 'md:order-last' : 'md:order-first'}`}
          data={block.content} />}
        <div className={`**:bg-sky-400 border border-black`}>
          <p className={``}>Paragraph text</p>
          <div className={``}>
            <p className={`bg-amber-700`}>This is span 1</p>
            <p className={`bg-amber-700`}>This is span 2</p>
          </div>
        </div>
        {block.image && typeof block.image !== 'string' &&
          <Image id={'test'} className={'md:col-span-9 col-span-12 landscape:grayscale'}
                 src={block.image.thumbnailURL || ``} alt={block.image.alt || ``}
                 width={block.image.width || 640} height={block.image.height || 360}
          />}
      </section>
    </div>
}
