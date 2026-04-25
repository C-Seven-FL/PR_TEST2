import {
  Button,
  Dialog,
  Input,
  Field,
  VStack
} from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";

export function CreateServiceDialog({ onCreated, currentUser }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    company_name: "",
    categoryID: "",
    description: "",
    company_address: "",
    hour_start: "",
    hour_end: "",
    slot_duration: ""
  });

  const handleChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCreate = async () => {
    try {
      const payload = {
        ...form,
        working_days: ["Monday"], // пока заглушка
        userID: currentUser?.uid
      };

      const res = await axios.post(
        "http://localhost:3001/service",
        payload
      );

      // обновить родителя
      onCreated?.(res.data);

      setOpen(false);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={() => setOpen(true)}>
        Add New Service
      </Button>

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Create Service</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <VStack gap="3">

              <Field.Root>
                <Field.Label>Company Name</Field.Label>
                <Input
                  value={form.company_name}
                  onChange={(e) =>
                    handleChange("company_name", e.target.value)
                  }
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Category ID</Field.Label>
                <Input
                  value={form.categoryID}
                  onChange={(e) =>
                    handleChange("categoryID", e.target.value)
                  }
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value)
                  }
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Address</Field.Label>
                <Input
                  value={form.company_address}
                  onChange={(e) =>
                    handleChange("company_address", e.target.value)
                  }
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Start Hour</Field.Label>
                <Input
                  value={form.hour_start}
                  onChange={(e) =>
                    handleChange("hour_start", e.target.value)
                  }
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>End Hour</Field.Label>
                <Input
                  value={form.hour_end}
                  onChange={(e) =>
                    handleChange("hour_end", e.target.value)
                  }
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Slot Duration</Field.Label>
                <Input
                  value={form.slot_duration}
                  onChange={(e) =>
                    handleChange("slot_duration", e.target.value)
                  }
                />
              </Field.Root>

            </VStack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button colorScheme="blue" onClick={handleCreate}>
              Create
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}