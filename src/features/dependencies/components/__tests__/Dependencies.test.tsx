import React from "react";
import { render } from "@testing-library/react";
import { Dependencies } from "../Dependencies";
import { mockTheme } from "../../../../utils/helpers/mockTheme";

test("<Dependencies />", () => {
  const { container } = render(
    mockTheme(<Dependencies mode="read-only" dependencies={[]} />)
  );
});
