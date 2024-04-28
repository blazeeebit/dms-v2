import { Skeleton } from '@/components/ui/skeleton'

type UISkeletonsProps = {
  skeleton: 'form' | 'post' | 'profile' | 'filters' | 'search'
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
    case 'filters':
      return (
        <div className="flex gap-3 items-center">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      )
    case 'search':
      return (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )
    default:
      return <></>
  }
}
