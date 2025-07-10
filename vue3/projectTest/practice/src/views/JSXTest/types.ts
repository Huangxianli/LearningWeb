export interface ListItem {
  id: number;
  name: string;
}

export interface JSXTest3Event {
  'update:modelValue': (value: string) => void;
}

export interface ModelValueModifiers {
  trim?: true;
  upper?: true;
}
