import { render, screen } from "@testing-library/react";

import { SkillCard } from ".";

const skillCardMock = {
  title: "captação de demanda",
  description:
    "entender e perguntar o mínimo possível para melhor fluidez no planejamento.",
};

describe("Skill Card Component", () => {
  beforeEach(() => {
    render(<SkillCard {...skillCardMock} />);
  });

  it("Should be able to render the Skill Card component with props", async () => {
    const skillCardComponent = await screen.findByTestId("skill-card");
    expect(skillCardComponent).toBeInTheDocument();
  });

  it("Should be able to render the title element", async () => {
    const titleElement = await screen.findByRole("heading", {
      name: skillCardMock.title,
      level: 3,
    });
    expect(titleElement).toBeInTheDocument();
  });

  it("Should be able to render the description element", async () => {
    const descriptionElement = await screen.findByText(
      skillCardMock.description,
    );
    expect(descriptionElement).toBeInTheDocument();
  });
});
