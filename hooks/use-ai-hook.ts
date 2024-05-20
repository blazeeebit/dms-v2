import { onGenerateAiDormDescription } from '@/actions/ai'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'

export const useAiDescription = (
  id: string,
  name: string,
  services: {
    name: string
    icon: string
  }[],
  setDescription: UseFormSetValue<FieldValues>
) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const onGenerateDescription = async () => {
    try {
      setLoading(true)
      const description = await onGenerateAiDormDescription(id, name, services)
      if (description) {
        if (description.status == 200) {
          setDescription('description', description.message)
        }
        if (description.status == 400) {
          toast({
            title: 'Error',
            description: description.message,
          })
        }
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    loading,
    onGenerateDescription,
  }
}
