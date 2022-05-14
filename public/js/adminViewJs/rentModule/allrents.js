/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */

// Delete Buttons
document.querySelectorAll('.action-archive-rent').forEach(($actionDelete) => {
  $actionDelete.addEventListener('click', (e) => {
    let { status } = $actionDelete.dataset;

    const { id } = $actionDelete.dataset;
    if (status === '0') {
      status = 'Pending';
    } else if (status === '1') {
      status = 'Payed';
    } else if (status === '2') {
      status = 'Finished';
    }
    if (
      !confirm(
        `Confirm that you want to archived the Rent #${id}
         with status: ${status} ? This operation cannot be undone.`,
      )
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  });
});
// Edit Buttons
document.querySelectorAll('.action-edit-rent').forEach(($actionEdit) => {
  $actionEdit.addEventListener('click', (e) => {
    let { status } = $actionEdit.dataset;
    const { id } = $actionEdit.dataset;

    if (status === '0') {
      status = 'Pending';
    } else if (status === '1') {
      status = 'Payed';
    } else if (status === '2') {
      status = 'Finished';
    }

    if (
      !confirm(
        `Confirm that you want to edit the rent # ${id}
        with status: ${status}? This operation cannot be undone.`,
      )
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  });
});

// Pay Buttons
document.querySelectorAll('.action-pay-rent').forEach(($actionEdit) => {
  $actionEdit.addEventListener('click', (e) => {
    let { status } = $actionEdit.dataset;
    const { id } = $actionEdit.dataset;

    if (status === '0') {
      status = 'Pending';
    } else if (status === '1') {
      status = 'Payed';
    } else if (status === '2') {
      status = 'Finished';
    }

    if (
      !confirm(
        `Confirm that you want to pay the rent # ${id}
        with status: ${status}? This operation cannot be undone.`,
      )
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  });
});
// Finish buttons
document.querySelectorAll('.action-finish-rent').forEach(($actionEdit) => {
  $actionEdit.addEventListener('click', (e) => {
    let { status } = $actionEdit.dataset;
    const { id } = $actionEdit.dataset;

    if (status === '0') {
      status = 'Pending';
    } else if (status === '1') {
      status = 'Payed';
    }

    if (
      !confirm(
        `Confirm that you want to finish the rent # ${id}
        with status: ${status}? This operation cannot be undone.`,
      )
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  });
});
document.addEventListener('DOMContentLoaded', () => {
  (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
    const $notification = $delete.parentNode;

    $delete.addEventListener('click', () => {
      $notification.parentNode.removeChild($notification);
    });
  });
});
