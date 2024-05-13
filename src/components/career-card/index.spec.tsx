import { render } from "@testing-library/react";

import { Companies } from "@/@types/company";
import { CareerCard } from "@/components/career-card";
import { CareerCardProps } from "@/components/career-card/interface";
import { getCompany } from "@/utility/get-company";

import { strings } from "./strings";

const companyMock = getCompany(Companies.MERITUM);
const outsourcedCompanyMock = getCompany(Companies.OLIST);

const presentCompanyMock: CareerCardProps = {
  role: "frontend software engineer",
  startDate: "2022-04-15",
  company: companyMock,
};

const previouslyCompanyMock: CareerCardProps = {
  role: "mobile software engineer",
  startDate: "2021-05-15",
  endDate: "2022-03-15",
  company: companyMock,
};

const previouslyWithOutsourcedCompanyMock: CareerCardProps = {
  role: "frontend software engineer",
  startDate: "2021-05-15",
  endDate: "2022-03-15",
  company: companyMock,
  outsourced: outsourcedCompanyMock,
};

describe("Career Card Component", () => {
  it("Should be able to render the Career Card component with props", async () => {
    const screen = render(<CareerCard {...presentCompanyMock} />);
    const careerCardComponent = await screen.findByTestId("career-card");
    expect(careerCardComponent).toBeInTheDocument();
  });

  it("Should be able to render the role element", async () => {
    const screen = render(<CareerCard {...presentCompanyMock} />);
    const roleElement = await screen.findByText(presentCompanyMock.role);
    expect(roleElement).toBeInTheDocument();
  });

  it("Should be able to render the company name element", async () => {
    const screen = render(<CareerCard {...presentCompanyMock} />);
    const companyNameElement = await screen.findByRole("link", {
      name: presentCompanyMock.company.name,
    });

    expect(companyNameElement).toBeInTheDocument();
    expect(companyNameElement).toHaveAttribute(
      "href",
      presentCompanyMock.company.url,
    );
  });

  it("Should be able to render the company state location element", async () => {
    const screen = render(<CareerCard {...presentCompanyMock} />);
    const companyStateLocationElement = await screen.findByText(
      presentCompanyMock.company.stateLocation,
    );
    expect(companyStateLocationElement).toBeInTheDocument();
  });

  it("Should be able to render the company link element", async () => {
    const screen = render(<CareerCard {...presentCompanyMock} />);
    const companyLinkElement = await screen.findByRole("link", {
      name: presentCompanyMock.company.name,
    });
    expect(companyLinkElement).toBeInTheDocument();
    expect(companyLinkElement).toHaveAttribute(
      "href",
      presentCompanyMock.company.url,
    );
  });

  it("Should be able to render the present element", async () => {
    const screen = render(<CareerCard {...presentCompanyMock} />);
    const presentElement = await screen.findByText(strings.present);
    expect(presentElement).toBeInTheDocument();
  });

  it("Should NOT be able to render the present element", async () => {
    const screen = render(<CareerCard {...previouslyCompanyMock} />);
    const presentElement = screen.queryByText(strings.present);
    expect(presentElement).toBeNull();
  });

  it("Should be able to render the outsourced company name element", async () => {
    const screen = render(
      <CareerCard {...previouslyWithOutsourcedCompanyMock} />,
    );
    const companyNameElement = await screen.findByText(
      outsourcedCompanyMock.name,
    );

    expect(companyNameElement).toBeInTheDocument();
  });

  it("Should be able to render the outsourced company link element", async () => {
    const screen = render(
      <CareerCard {...previouslyWithOutsourcedCompanyMock} />,
    );
    const companyLinkElement = await screen.findByRole("link", {
      name: previouslyWithOutsourcedCompanyMock.company.name,
    });

    expect(companyLinkElement).toBeInTheDocument();
    expect(companyLinkElement).toHaveAttribute(
      "href",
      previouslyWithOutsourcedCompanyMock.company.url,
    );
  });
});
