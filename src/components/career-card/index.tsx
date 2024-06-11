import { Fragment } from "react";

import { dateTimeFormat } from "@/utility/date-time-format";

import { CareerCardProps } from "./interface";
import { strings } from "./strings";

export const CareerCard = (props: CareerCardProps) => {
  const { role, company, startDate, outsourced } = props;

  const isEndedDate = !!props.endDate;

  return (
    <div data-testid="career-card" className="flex flex-col gap-2">
      <h3 className="text-base font-medium text-primary">{role}</h3>
      <p className="text-base text-secondary">
        <a
          href={company.url}
          target="_blank"
          className="text-primary underline transition-colors hover:text-secondary"
        >
          {company.name}
        </a>
        {outsourced && (
          <Fragment>
            <span className="text-primary">{" | "}</span>
            <a
              href={outsourced.url}
              target="_blank"
              className="text-primary underline transition-colors hover:text-secondary"
            >
              {outsourced.name}
            </a>
          </Fragment>
        )}
        {" - "}
        <span className="inline-block not-italic">{company.stateLocation}</span>
      </p>
      <p className="text-base text-secondary">
        <span>{dateTimeFormat(new Date(startDate))}</span>
        {" - "}
        {isEndedDate ? (
          <span>{dateTimeFormat(new Date(props.endDate as string))}</span>
        ) : (
          <span>{strings.present}</span>
        )}
      </p>
    </div>
  );
};
