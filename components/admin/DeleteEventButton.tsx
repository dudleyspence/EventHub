"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { removeEvent } from "@/lib/actions/removeEvent";
import { useRouter } from "next/navigation";

export default function DeleteEventButtton({
  event_id,
  user_id,
}: {
  event_id: string;
  user_id: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  async function handleDeleteEvent(onClose: () => void) {
    setLoading(true);
    try {
      if (!user_id) return;
      await removeEvent(user_id, event_id);

      alert("Event deleted successfully");
      onClose();

      router.push("/admin/events");
    } catch (error) {
      console.error(error);
      alert("Failed to delete event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button className="bg-red-600 text-white" onPress={onOpen} variant="flat">
        Delete Event
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        isDismissable={!loading}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Event
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this event? Once deleted this
                  cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  disabled={loading}
                  color="primary"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  disabled={loading}
                  isLoading={loading}
                  className="bg-red-600 text-white"
                  onPress={() => {
                    handleDeleteEvent(onClose);
                  }}
                >
                  Delete Event
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
