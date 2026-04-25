"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useState } from "react"

export function Selector({ 
    objectList = [],
    placeholder = "Select",
    value,
    onValueChange,
    ...props }) {

  //const [value, setValue] = useState("");

  const collection = createListCollection({
    items: objectList.map((item) => ({ 
      label: item.name ? item.name :item.company_name,
      value: String(item.id),
    })),
  });

  const handleChange = (e) => {
  const val = e.value;

  if (!val) return;

  //setValue(val);

  if (onValueChange) {
    onValueChange({ value: val });
  }
};

  return (
    <Select.Root
      collection={collection}
      value={value}
      onValueChange={handleChange}
      size="sm"
      {...props}
    >
      <Select.HiddenSelect />

      <Select.Label>{placeholder}</Select.Label>

      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder}>
            {collection.items.find(item => item.value === value)?.label}
          </Select.ValueText>
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