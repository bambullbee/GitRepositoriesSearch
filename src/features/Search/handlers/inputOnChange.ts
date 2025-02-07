import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function inputOnChange(
  e: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<string>>
) {
  setState(e.target.value);
}
