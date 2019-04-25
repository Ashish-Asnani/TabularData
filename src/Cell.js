import * as React from 'react';

export default function Cell({
  content,
  header,
  viewClass
}) {

  const cellMarkup = header ? (
    <th className="Cell Cell-header">
      {content}
    </th>
  ) : viewClass ? (
    <td className="Cell">
      <div className="tooltip">View
        <span className="tooltiptext">{content}</span>
    </div>
    </td>
  ): (
    <td className="Cell">
      {content}
    </td>
  );

  return (cellMarkup);
}