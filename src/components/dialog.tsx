import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  children: ReactNode;
  description?: string | any;
  onCancel?: () => {};
  onAction?: () => {};
};

const CustomDialog = (props: Props) => {
  const { children, title, description, onCancel, onAction } = props;

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {onCancel && <Button onClick={onCancel}>Cancel</Button>}
          {onAction && <Button onClick={onAction}>Continue</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
