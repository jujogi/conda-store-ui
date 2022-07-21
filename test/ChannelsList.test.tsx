import React from "react";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import { create } from "react-test-renderer";
import { ChannelsList } from "../src/features/channels/components/ChannelsList";
import {
  StyledAccordionDetails,
  StyledAccordionExpandIcon,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "../src/styles";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";

import { Channel } from "../src/features/channels/components/Channel";

const channelsList = ["conda-store", "default", "conda forge"];

test("render Accordion component", () => {
  const { container } = render(<ChannelsList channelList={channelsList} />);
  //screen.debug();
});

//Snapshot
// const tree = create(<ChannelsList channelList={channelsList} />);
// test("snapshot", () => {
//   expect(tree).toMatchSnapshot();
// });
