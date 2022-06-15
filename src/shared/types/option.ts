type Value = number | string;
type Label = string;

export interface Option<V extends Value = Value, L extends Label = Label> {
  value: V;
  label: L;
}
