'use client';

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  ClipboardIcon,
  DiscIcon,
  FileIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export default function TaskColsIcons(props: {variant: string}) {
  const icons: Record<string, React.ReactNode> = {
    task: <ClipboardIcon />,
    quiz: <FileIcon />,
    low: <ArrowDownIcon />,
    medium: <ArrowRightIcon />,
    high: <ArrowUpIcon />,
    todo: <CircleIcon />,
    ongoing: <StopwatchIcon />,
    pending: <DiscIcon />,
    done: <CheckCircledIcon />,
    dueDate: <StopwatchIcon />,
  };

  return icons[props.variant];
}
