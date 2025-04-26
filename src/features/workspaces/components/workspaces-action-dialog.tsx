'use client'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { saveWorkspace, Workspace } from "@/services/workspacesService";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, { message: 'Workspace Name is required.' }),
  cpuLimit: z.coerce.number().min(1, { message: 'CPU must be at least 1 core.' }),
  memoryLimit: z.coerce.number().min(1, { message: 'Memory must be at least 1 Gi.' }),
  gpuLimit: z.coerce.number().min(0, { message: 'GPU cannot be negative.' }),
  isEdit: z.boolean(),
});

type WorkspaceForm = z.infer<typeof formSchema>;

interface Props {
  refresh: () => Promise<void>;
  currentRow?: Workspace;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkspacesActionDialog({ refresh, currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow;

  const form = useForm<WorkspaceForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
        name: currentRow.name,
        cpuLimit: Number(currentRow.cpuLimit), // string转成number
        memoryLimit: parseInt(currentRow.memoryLimit, 10), // "4Gi" => 4
        gpuLimit: Number(currentRow.gpuLimit),
        isEdit,
      }
      : {
        name: '',
        cpuLimit: 1,
        memoryLimit: 1,
        gpuLimit: 0,
        isEdit,
      },
  });


  const onSubmit = async (values: WorkspaceForm) => {
    // 转换成后端需要的格式
    const payload = {
      name: values.name,
      cpuLimit: String(values.cpuLimit),            // CPU转成字符串
      memoryLimit: `${values.memoryLimit}Gi`,        // Memory加Gi单位
      gpuLimit: values.gpuLimit,                     // GPU保持整数
    };

    try {
      await saveWorkspace(payload);
      await refresh();
      toast({
        title: 'Workspace have saved.',
        description: `Workspace ${values.name} have ${isEdit ? 'updated' : 'created'}`,
      })
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving workspace:', error);
      toast({
        variant: 'destructive', // 失败提示
        title: 'Failed to save workspace',
        description: '服务器错误，请稍后再试。',
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? 'Edit Workspace' : 'Add New Workspace'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update your workspace settings below.' : 'Fill in the details to create a new workspace.'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] w-full py-1 pr-4">
          <Form {...form}>
            <form
              id="workspace-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-1 text-right">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. dev-namespace"
                        readOnly={isEdit}
                        className={`col-span-4 ${isEdit ? 'opacity-60 cursor-not-allowed' : ''}`}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpuLimit"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-1 text-right">CPU</FormLabel>
                    <FormControl>
                      <div className="flex items-center col-span-4">
                        <Input
                          type="number"
                          placeholder="e.g. 2"
                          autoComplete="off"
                          {...field}
                        />
                        <span className="ml-2">Cores</span>
                      </div>
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="memoryLimit"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-1 text-right">Memory</FormLabel>
                    <FormControl>
                      <div className="flex items-center col-span-4">
                        <Input
                          type="number"
                          placeholder="e.g. 4"
                          autoComplete="off"
                          {...field}
                        />
                        <span className="ml-2">Gi</span>
                      </div>
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gpuLimit"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-1 text-right">GPU</FormLabel>
                    <FormControl>
                      <div className="flex items-center col-span-4">
                        <Input
                          type="number"
                          placeholder="e.g. 0"
                          autoComplete="off"
                          {...field}
                        />
                        <span className="ml-2">Cards</span>
                      </div>
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="workspace-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

