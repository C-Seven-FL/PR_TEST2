import { Box, Heading, Input, Textarea, VStack, HStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {Multiselector} from "./multiselector"
import { ConfirmDialog } from "./ConfirmDialog";
import axios from "axios";

export function ServiceInfoPanel({ service, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [original, setOriginal] = useState(null);

  useEffect(() => {
    if (service) {
      setForm(service);
      setOriginal(service);
      setIsEditing(false);
    }
  }, [service]);

  if (!service || !form) {
    return <Box flex="1" bg="gray.800" p={4} borderRadius="xl">Select service first</Box>;
  }

  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/service/${service.id}`,
        form
      );

      setOriginal(form);
      setIsEditing(false);

      onUpdated?.();

    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    setForm(original);
    setIsEditing(false);
  };

  return (
    <Box flex="1" bg="gray.800" p={4} borderRadius="xl">

      <HStack justify="space-between" mb={4}>
        <Heading size="sm">Service Info</Heading>

        {!isEditing ? (
          <Button size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ) : (
          <HStack>
            
            <ConfirmDialog
              title="Save changes?"
              description="Are you sure you want to update this service?"
              confirmText="Save"
              onConfirm={handleSave}
              trigger={
                <Button size="sm" colorScheme="green">
                  Save
                </Button>
              }
            />

            <Button size="sm" variant="outline" onClick={handleCancel} color="white" _hover={{ bg: "red.500", color: "white", borderColor: "red.500" }}>
              Cancel
            </Button>
          </HStack>
        )}
      </HStack>

      <VStack align="stretch" gap={3}>

        <Input
          value={form.name ?? ""}
          onChange={(e) => handleChange("name", e.target.value)}
          disabled={!isEditing}
        />

        <Input
          value={form.categoryID ?? ""}
          onChange={(e) => handleChange("categoryID", e.target.value)}
          disabled={!isEditing}
        />

        <Textarea
          value={form.description ?? ""}
          onChange={(e) => handleChange("description", e.target.value)}
          disabled={!isEditing}
        />

        <Input
          value={form.address ?? ""}
          onChange={(e) => handleChange("address", e.target.value)}
          disabled={!isEditing}
        />

        <Multiselector 
          isDisabled={!isEditing}
          value={form.working_days ?? []}
          onChange={(val) => handleChange("working_days", val)}
        />

        <HStack>
          <Input
            value={form.hour_start ?? ""}
            onChange={(e) => handleChange("hour_start", e.target.value)}
            disabled={!isEditing}
          />

          <Input
            value={form.hour_end ?? ""}
            onChange={(e) => handleChange("hour_end", e.target.value)}
            disabled={!isEditing}
          />

          <Input
            value={form.slot_duration ?? ""}
            onChange={(e) => handleChange("slot_duration", e.target.value)}
            disabled={!isEditing}
          />
        </HStack>

      </VStack>
    </Box>
  );
}