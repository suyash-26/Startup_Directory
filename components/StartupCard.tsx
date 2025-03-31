import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function StartupCard({post}:{post:StartupTypeCard}) {
  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_date'>
                {formatDate(post.createdAt)}
            </p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-6 text-primary'/>
                <span className='text-16-medium'>{post.views}</span>
            </div>
        </div>
        <div className='flex-between mt-5 gap-5'>
            <div className='flex-1'>
                <Link href={`user/${post.author?._id}`}>
                    <p className='text-16-medium line-clamp-1'>{post.author.name}</p>
                </Link>
                <Link href={`/startup/${post._id}`}>
                    <h3 className='text-26-semibold line-clamp-1'>
                        {post.title}
                    </h3>
                </Link>
            </div>
            <Link href={`/user/${post.author._id}`}>
            {/* Below error will be there if we don't configure images in next.config.ts */}
            {/* Error: Invalid src prop (https://placehold.co/600x400) on `next/image`, hostname "placehold.co" is not configured under images in your `next.config.js` */}
                <Image src="https://tse2.mm.bing.net/th?id=OIP.7cRYFyLoDEDh4sRtM73vvwHaDg&pid=Api&P=0&h=180" alt="placeholder" width={48} height={48} className="rounded-full"/>
            </Link>
        </div>
        <Link href={`/startup/${post._id}`}>
            <p className='startup-card_desc'>
                {post.description}
            </p>
            <img src={post.image} alt="plac" className='startup-card_img'/>
        </Link>

        <div className='flex-between gap-3 mt-5'>
            <Link href={`/?query=${post.category.toLowerCase()}`}>
                <p className='text-16-medium'>{post.category}</p>
            </Link>
            <Button className='startup-card_btn' asChild>
                <Link href={`/startup/${post._id}`}>
                    Details
                </Link>
            </Button>
        </div>
    </li>
  )
}
