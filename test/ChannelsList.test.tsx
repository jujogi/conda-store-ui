import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ChannelsList } from "../src/features/channels/components/ChannelsList";
import { mockTheme } from "./testutils";

const channelsList = ["conda-store", "default"];

describe("<ChannelsList />", () => {
  it("render component", () => {
    render(mockTheme(<ChannelsList channelList={channelsList} />));
    expect(channelsList.length).toBe(2);
    expect(screen.getByText("Channels")).toBeInTheDocument();
    expect(screen.getByText(`${channelsList[0]}`)).toBeInTheDocument();
    expect(screen.getByText(`${channelsList[1]}`)).toBeInTheDocument();

    expect(screen.getByText(`${channelsList[0]}`)).not.toBeVisible();
    expect(screen.getByText(`${channelsList[1]}`)).not.toBeVisible();
  });

  it("expand component to see available channels", () => {
    render(mockTheme(<ChannelsList channelList={channelsList} />));
    const arrow = getByTestId(
      document.documentElement,
      "ArrowRightRoundedIcon"
    );
    fireEvent.click(arrow);

    expect(screen.getByText(`${channelsList[0]}`)).toBeVisible();
    expect(screen.getByText(`${channelsList[1]}`)).toBeVisible();
  });
});
