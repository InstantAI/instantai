'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Notebook, NotebookContainer, saveNotebook } from '@/services/notebooksService'

const parseK8sCpu = (cpuString?: string) => {
  if (!cpuString) return undefined
  if (cpuString.endsWith('m')) {
    return parseFloat(cpuString) / 1000
  }
  return parseFloat(cpuString)
}

const parseK8sMemory = (memoryString?: string) => {
  if (!memoryString) return undefined
  return parseInt(memoryString.replace(/[^0-9]/g, ''))
}
const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required.' }),
    image: z.string().min(1, { message: 'Image Name is required.' }),
    cpu: z.coerce.number().min(0.1, "至少0.1核"),
    memory: z.coerce.number().min(64, "至少64Mi"),
    isEdit: z.boolean(),
  })
type NotebookForm = z.infer<typeof formSchema>

function buildDefaultValues(currentRow?: Notebook): NotebookForm {
  if (!currentRow) {
    return {
      name: '',
      image: '',
      cpu: 0.1,
      memory: 64,
      isEdit: false,
    }
  }

  const container = currentRow.spec.template.spec.containers?.[0]

  return {
    name: currentRow.metadata.name,
    image: container?.image ?? '',
    cpu: parseK8sCpu(container?.resources?.limits?.cpu) ?? 0.1,
    memory: parseK8sMemory(container?.resources?.limits?.memory) ?? 64,
    isEdit: true,
  }
}

interface Props {
  currentRow?: Notebook
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotebooksActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const form = useForm<NotebookForm>({
    resolver: zodResolver(formSchema),
    defaultValues: buildDefaultValues(currentRow),
  })

  const onSubmit = async (values: NotebookForm) => {
    try {
      const namespace = currentRow?.metadata?.namespace || 'default'
      const resources = {
        limits: {
          cpu: values.cpu ? `${values.cpu * 1000}m` : undefined,
          memory: values.memory ? `${values.memory}Mi` : undefined
        }
      }
      const containers: NotebookContainer = {
        name: values.name,
        image: values.image,
        resources: {
          limits: {
            ...(resources.limits.cpu && { cpu: resources.limits.cpu }),
            ...(resources.limits.memory && { memory: resources.limits.memory })
          }
        }
      }
      await saveNotebook(namespace, containers)
      toast({
        title: 'Notebook have saved.',
        description: `Notebook ${values.name} have ${isEdit ? 'updated' : 'created'}`,
      })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Save Notebook failed.',
        description: error instanceof Error ? error.message : 'unknown error',
        variant: 'destructive'
      })
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Edit Notebook' : 'Add New Notebook'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the notebook here. ' : 'Create new notebook here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='-mr-4 h-[26.25rem] w-full py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-1 text-right'>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`col-span-4 ${isEdit ? 'opacity-60 cursor-not-allowed' : ''}`}
                        autoComplete='off'
                        readOnly={isEdit}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-1 text-right'>
                      Image
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpu"
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-1 text-right'>
                      CPU (cores)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0.1"
                        step="0.1"
                        className='col-span-4'
                        placeholder="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="memory"
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-1 text-right'>
                      Memory (Mi)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="64"
                        step="64"
                        className='col-span-4'
                        placeholder="64"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
