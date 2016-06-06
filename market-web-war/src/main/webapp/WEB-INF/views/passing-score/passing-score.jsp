<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head lang="en">
  <%@ include file="../common/meta.jsp"%>
  <link rel="stylesheet" href="<%=ctx%>/static/dist/css/passing-score/style.css" />
</head>

<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
  <div class="container-header">
    <span>浙江</span>
  </div>
  <div class="province-option-list hidden">
      <div class="province-item active" data-name="浙江">浙江</div>
      <div class="province-item" data-name="广西">广西</div>
      <div class="province-item" data-name="湖南">湖南</div>
      <div class="province-item" data-name="湖北">湖北</div>
      <div class="province-item" data-name="广东">广东</div>
      <div class="province-item" data-name="福建">福建</div>
      <div class="province-item" data-name="河南">河南</div>
      <div class="province-item" data-name="山东">山东</div>
      <div class="province-item" data-name="河北">河北</div>
      <div class="province-item" data-name="四川">四川</div>
      <div class="province-item" data-name="上海">上海</div>
      <div class="province-item" data-name="重庆">重庆</div>
      <div class="province-item" data-name="江西">江西</div>
      <div class="province-item" data-name="云南">云南</div>
      <div class="province-item" data-name="陕西">陕西</div>
      <div class="province-item" data-name="北京">北京</div>
      <div class="province-item" data-name="天津">天津</div>
      <div class="province-item" data-name="安徽">安徽</div>
      <div class="province-item" data-name="江苏">江苏</div>
      <div class="province-item" data-name="吉林">吉林</div>
      <div class="province-item" data-name="辽宁">辽宁</div>
      <div class="province-item" data-name="甘肃">甘肃</div>
      <div class="province-item" data-name="山西">山西</div>
      <div class="province-item" data-name="贵州">贵州</div>
      <div class="province-item" data-name="宁夏">宁夏</div>
      <div class="province-item" data-name="新疆">新疆</div>
      <div class="province-item" data-name="海南">海南</div>
      <div class="province-item" data-name="黑龙江">黑龙江</div>
  </div>
  <div class="backdrop hidden"></div>
  <div>
    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>626</td>
          <td>472</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>605</td>
          <td>428</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>621</td>
          <td>485</td>
          <td>292</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>597</td>
          <td>420</td>
          <td>288</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>619</td>
          <td>468</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>617</td>
          <td>438</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>606</td>
          <td>452</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>593</td>
          <td>433</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>530</td>
          <td>380</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>480</td>
          <td>320</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>550</td>
          <td>463</td>
          <td>404</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>520</td>
          <td>407</td>
          <td>326</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>541</td>
          <td>467</td>
          <td>395</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>510</td>
          <td>413</td>
          <td>310</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>544</td>
          <td>473</td>
          <td>409</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>528</td>
          <td>444</td>
          <td>332</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="3">年份</th>
          <th rowspan="3">科目</th>
          <th colspan="4">批次</th>
        </tr>
        <tr style="background-color: #F77549;">
          <th rowspan="2" style="border-right: 1px solid #B2421D;">一批</th>
          <th rowspan="2" style="border-right: 1px solid #B2421D;">二批</th>
          <th colspan="2" style="border-bottom: 1px solid #B2421D;">三批</th>
        </tr>
        <tr>
          <th>A批次</th>
          <th>B批次</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>535</td>
          <td>481</td>
          <td>435</td>
          <td>435</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>526</td>
          <td>455</td>
          <td>406</td>
          <td>406</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>562</td>
          <td>501</td>
          <td>473</td>
          <td>353</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>522</td>
          <td>442</td>
          <td>406</td>
          <td>386</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>557</td>
          <td>502</td>
          <td>463</td>
          <td>376</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>495</td>
          <td>423</td>
          <td>435</td>
          <td>350</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>571</td>
          <td>523</td>
          <td>470</td>
          <td>484</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>520</td>
          <td>451</td>
          <td>357</td>
          <td>335</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>521</td>
          <td>477</td>
          <td>415</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>510</td>
          <td>448</td>
          <td>360</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>535</td>
          <td>482</td>
          <td>417</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>533</td>
          <td>471</td>
          <td>380</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>531</td>
          <td>480</td>
          <td>406</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>527</td>
          <td>462</td>
          <td>358</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>561</td>
          <td>515</td>
          <td>448</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>551</td>
          <td>494</td>
          <td>400</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>573</td>
          <td>524</td>
          <td>474</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>577</td>
          <td>519</td>
          <td>483</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>579</td>
          <td>534</td>
          <td>483</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>560</td>
          <td>504</td>
          <td>465</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>594</td>
          <td>546</td>
          <td>498</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>574</td>
          <td>516</td>
          <td>480</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>589</td>
          <td>545</td>
          <td>502</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>585</td>
          <td>523</td>
          <td>484</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>549</td>
          <td>462</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>525</td>
          <td>410</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>561</td>
          <td>482</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>506</td>
          <td>408</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>513</td>
          <td>431</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>501</td>
          <td>401</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>557</td>
          <td>446</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>546</td>
          <td>435</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>513</td>
          <td>455</td>
          <td>397</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>529</td>
          <td>458</td>
          <td>383</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>536</td>
          <td>483</td>
          <td>425</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>547</td>
          <td>476</td>
          <td>400</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>519</td>
          <td>465</td>
          <td>408</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>505</td>
          <td>443</td>
          <td>359</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>557</td>
          <td>509</td>
          <td>447</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>540</td>
          <td>481</td>
          <td>391</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>568</td>
          <td>510</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>562</td>
          <td>490</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>572</td>
          <td>—</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>579</td>
          <td>—</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>570</td>
          <td>—</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>554</td>
          <td>—</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>573</td>
          <td>450</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>582</td>
          <td>430</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>548</td>
          <td>496</td>
          <td>404</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>544</td>
          <td>474</td>
          <td>335</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>563</td>
          <td>513</td>
          <td>415</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>573</td>
          <td>503</td>
          <td>326</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>561</td>
          <td>511</td>
          <td>414</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>538</td>
          <td>478</td>
          <td>324</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>572</td>
          <td>529</td>
          <td>425</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>564</td>
          <td>509</td>
          <td>340</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>543</td>
          <td>473</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>528</td>
          <td>445</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>551</td>
          <td>500</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>540</td>
          <td>475</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>567</td>
          <td>505</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>562</td>
          <td>492</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>516</td>
          <td>454</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>518</td>
          <td>445</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>434</td>
          <td>372</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>414</td>
          <td>348</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>444</td>
          <td>390</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>423</td>
          <td>351</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>448</td>
          <td>403</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>405</td>
          <td>331</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>438</td>
          <td>379</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>423</td>
          <td>342</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>572</td>
          <td>532</td>
          <td>482</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>573</td>
          <td>527</td>
          <td>485</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>555</td>
          <td>507</td>
          <td>466</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>514</td>
          <td>455</td>
          <td>422</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>556</td>
          <td>499</td>
          <td>457</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>520</td>
          <td>462</td>
          <td>430</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>554</td>
          <td>494</td>
          <td>446</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>522</td>
          <td>462</td>
          <td>429</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>528</td>
          <td>487</td>
          <td>456</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>540</td>
          <td>490</td>
          <td>456</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>524</td>
          <td>479</td>
          <td>450</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>526</td>
          <td>471</td>
          <td>438</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>532</td>
          <td>484</td>
          <td>444</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>517</td>
          <td>456</td>
          <td>406</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>570</td>
          <td>523</td>
          <td>452</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>547</td>
          <td>486</td>
          <td>378</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>540</td>
          <td>470</td>
          <td>420</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>500</td>
          <td>425</td>
          <td>380</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>565</td>
          <td>500</td>
          <td>450</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>525</td>
          <td>445</td>
          <td>400</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>520</td>
          <td>455</td>
          <td>405</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>495</td>
          <td>425</td>
          <td>375</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>520</td>
          <td>460</td>
          <td>430</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>465</td>
          <td>395</td>
          <td>370</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>510</td>
          <td>467</td>
          <td>382</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>480</td>
          <td>440</td>
          <td>350</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>548</td>
          <td>492</td>
          <td>387</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>503</td>
          <td>452</td>
          <td>342</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>540</td>
          <td>486</td>
          <td>385</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>485</td>
          <td>435</td>
          <td>330</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>556</td>
          <td>497</td>
          <td>377</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>517</td>
          <td>461</td>
          <td>331</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>579</td>
          <td>527</td>
          <td>477</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>548</td>
          <td>495</td>
          <td>452</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>565</td>
          <td>507</td>
          <td>458</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>543</td>
          <td>495</td>
          <td>466</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>549</td>
          <td>494</td>
          <td>454</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>550</td>
          <td>505</td>
          <td>475</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>495</td>
          <td>446</td>
          <td>416</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>477</td>
          <td>433</td>
          <td>402</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>547</td>
          <td>486</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>538</td>
          <td>459</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>523</td>
          <td>462</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>516</td>
          <td>439</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>533</td>
          <td>474</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>521</td>
          <td>436</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>549</td>
          <td>489</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>530</td>
          <td>440</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>597</td>
          <td>558</td>
          <td>522</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>555</td>
          <td>511</td>
          <td>483</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>541</td>
          <td>500</td>
          <td>469</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>489</td>
          <td>438</td>
          <td>409</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>540</td>
          <td>498</td>
          <td>458</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>490</td>
          <td>429</td>
          <td>387</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>577</td>
          <td>541</td>
          <td>512</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>544</td>
          <td>478</td>
          <td>431</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>342</td>
          <td>313</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>344</td>
          <td>310</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>333</td>
          <td>301</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>345</td>
          <td>312</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>328</td>
          <td>299</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>338</td>
          <td>312</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>341</td>
          <td>311</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>340</td>
          <td>312</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>543</td>
          <td>433</td>
          <td>300</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>525</td>
          <td>405</td>
          <td>305</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>560</td>
          <td>459</td>
          <td>350</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>555</td>
          <td>445</td>
          <td>350</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>510</td>
          <td>401</td>
          <td>318</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>535</td>
          <td>421</td>
          <td>345</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>529</td>
          <td>435</td>
          <td>348</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>515</td>
          <td>412</td>
          <td>338</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>530</td>
          <td>460</td>
          <td>395</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>500</td>
          <td>419</td>
          <td>345</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>552</td>
          <td>490</td>
          <td>430</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>526</td>
          <td>450</td>
          <td>380</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>554</td>
          <td>499</td>
          <td>445</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>538</td>
          <td>470</td>
          <td>415</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>563</td>
          <td>506</td>
          <td>454</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>517</td>
          <td>445</td>
          <td>388</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>517</td>
          <td>465</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>475</td>
          <td>417</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>543</td>
          <td>499</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>516</td>
          <td>459</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>503</td>
          <td>451</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>489</td>
          <td>430</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>533</td>
          <td>485</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>517</td>
          <td>462</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>513</td>
          <td>462/398(C)</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>515</td>
          <td>442/310(C)</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>515</td>
          <td>478</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>534</td>
          <td>442</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>507</td>
          <td>459</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>493</td>
          <td>441</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>539</td>
          <td>492</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>530</td>
          <td>476</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>543</td>
          <td>472</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>453</td>
          <td>372</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>569</td>
          <td>489</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>484</td>
          <td>382</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>522</td>
          <td>446</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>449</td>
          <td>360</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>539</td>
          <td>461</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>470</td>
          <td>390</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>507</td>
          <td>478</td>
          <td>378</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>445</td>
          <td>416</td>
          <td>316</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>517</td>
          <td>486</td>
          <td>370</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>473</td>
          <td>440</td>
          <td>320</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>484</td>
          <td>450</td>
          <td>350</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>455</td>
          <td>417</td>
          <td>300</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>489</td>
          <td>453</td>
          <td>350</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>440</td>
          <td>401</td>
          <td>300</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>486</td>
          <td>414</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>446</td>
          <td>381</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>516</td>
          <td>446</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>475</td>
          <td>405</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>460</td>
          <td>394</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>443</td>
          <td>378</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>493</td>
          <td>426</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>445</td>
          <td>390</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>662</td>
          <td>588</td>
          <td>494</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>608</td>
          <td>546</td>
          <td>484</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>666</td>
          <td>590</td>
          <td>498</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>606</td>
          <td>542</td>
          <td>482</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>667</td>
          <td>590</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>667</td>
          <td>541</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>668</td>
          <td>591</td>
          <td>525</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>614</td>
          <td>545</td>
          <td>495</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="containert-content">
      <table>
        <thead>
        <tr>
          <th rowspan="2">年份</th>
          <th rowspan="2">科目</th>
          <th colspan="3">批次</th>
        </tr>
        <tr>
          <th>一批</th>
          <th>二批</th>
          <th>三批</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td rowspan="2" class="fwb">2015年</td>
          <td>文科</td>
          <td>495</td>
          <td>410</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>483</td>
          <td>371</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2014年</td>
          <td>文科</td>
          <td>541</td>
          <td>454</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>529</td>
          <td>414</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2013年</td>
          <td>文科</td>
          <td>504</td>
          <td>424</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>527</td>
          <td>437</td>
          <td>-</td>
        </tr>
        <tr>
          <td rowspan="2" class="fwb">2012年</td>
          <td>文科</td>
          <td>526</td>
          <td>449</td>
          <td>-</td>
        </tr>
        <tr>
          <td>理科</td>
          <td>514</td>
          <td>425</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<script id="UniversityMajorEnrollingSituationList-tpl" type="text/x-handlebars-template">
			</script>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/passingScore.js?V=11"></script>
</body>

</html>