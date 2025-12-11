import { useState, useCallback } from "react";

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

interface ConfirmOptions {
  title: string;
  message: string;
}

const defaultState: ConfirmState = {
  isOpen: false,
  title: "",
  message: "",
  onConfirm: () => {},
};

export function useConfirm() {
  const [state, setState] = useState<ConfirmState>(defaultState);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        title: options.title,
        message: options.message,
        onConfirm: () => {
          setState(defaultState);
          resolve(true);
        },
      });
    });
  }, []);

  const handleCancel = useCallback(() => {
    setState(defaultState);
  }, []);

  return {
    confirm,
    confirmModalProps: {
      isOpen: state.isOpen,
      title: state.title,
      message: state.message,
      onConfirm: state.onConfirm,
      onCancel: handleCancel,
    },
  };
}
