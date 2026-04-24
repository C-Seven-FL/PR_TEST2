"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"

export function Multiselector({
  isDisabled,
  value = [],
  onChange
}) {
  const collection = createListCollection({
    items: [
      { label: "Mon", value: "Monday" },
      { label: "Tue", value: "Tuesday" },
      { label: "Wed", value: "Wednesday" },
      { label: "Thu", value: "Thursday" },
      { label: "Fri", value: "Friday" },
      { label: "Sat", value: "Saturday" },
      { label: "Sun", value: "Sunday" },
    ],
  });

  const handleChange = (e) => {
    const val = Array.isArray(e.value) ? e.value : [e.value];

    onChange?.(val);
  };

  return (
    <Select.Root
      multiple
      disabled={isDisabled}
      collection={collection}
      value={value}
      onValueChange={handleChange}
      size="sm"
      width="320px"
    >
      <Select.HiddenSelect />

      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select workdays" />
        </Select.Trigger>

        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}