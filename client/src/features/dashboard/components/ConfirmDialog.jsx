"use client"

import {
  Dialog,
  Portal,
  Button,
  HStack,
  Text
} from "@chakra-ui/react";

export function ConfirmDialog({
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isDanger = false
}) {
  return (
    <Dialog.Root>
      
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>

            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Text>{description}</Text>
            </Dialog.Body>

            <Dialog.Footer>
                <HStack w="100%" justify="flex-end">

                    <Dialog.CloseTrigger asChild>
                    <Button variant="outline">
                        X
                    </Button>
                    </Dialog.CloseTrigger>

                    <Button
                    colorScheme="green"
                    onClick={async () => {
                        await onConfirm?.();
                    }}
                    >
                    Save
                    </Button>

                </HStack>
            </Dialog.Footer>

          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>

    </Dialog.Root>
  );
}