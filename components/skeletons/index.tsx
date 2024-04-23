import { Skeleton } from '@/components/ui/skeleton'

type UISkeletonsProps = {
  skeleton: 'form' | 'post' | 'profile'
}

export const UISkeletons = ({ skeleton }: UISkeletonsProps) => {
  switch (skeleton) {
    case 'form':
      return (
        <div className="flex flex-col justify-center gap-3 items-center py-10">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      )
    default:
      return <></>
  }
}
