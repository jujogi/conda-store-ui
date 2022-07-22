import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ChannelsEdit } from "../src/features/channels/components/ChannelsEdit";
import { mockTheme } from "./testutils";

const channelsList = ["conda-store", "default"];

describe("<ChannelsEdit />", () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  it("render component", () => {
    const component = render(
      mockTheme(<ChannelsEdit channelsList={channelsList} />)
    );
    expect(component.container).toHaveTextContent("Channels");
  });

  it("add new channel", () => {
    const component = render(
      mockTheme(<ChannelsEdit channelsList={channelsList} />)
    );
    const addChannelButton = component.getByText("+ Add Channel");
    fireEvent.click(addChannelButton);

    expect(component.container).toHaveTextContent("Enter channel");

    const input = component.getByLabelText("Enter channel");
    fireEvent.change(input, { target: { value: "test-channel" } });
    expect(screen.getByLabelText("Enter channel")).toHaveValue("test-channel");
    fireEvent.focusOut(input);
    expect(component.container).toHaveTextContent("test-channel");
  });

  it("remove channel", () => {
    const component = render(
      mockTheme(<ChannelsEdit channelsList={channelsList} />)
    );
    const deleteIcons = component.getAllByTestId("DeleteIcon");
    fireEvent.click(deleteIcons[0]);

    expect(component.container).not.toHaveTextContent("conda-store");
  });

  it("click Close icon", () => {
    const component = render(
      mockTheme(<ChannelsEdit channelsList={channelsList} />)
    );
    const addChannelButton = component.getByText("+ Add Channel");
    fireEvent.click(addChannelButton);

    const closeIcon = component.getByTestId("CloseIcon");
    fireEvent.click(closeIcon);
    expect(component.container).not.toHaveTextContent("Enter package");
  });
});
