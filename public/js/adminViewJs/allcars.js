/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
document.querySelectorAll('.action-delete').forEach(($actionDelete) => {
  $actionDelete.addEventListener('click', (e) => {
    const { id, brand, model } = $actionDelete.dataset;
    if (
      !confirm(
        `Confirm that you want to remove the car: ${brand},
         ${model} with ID ${id}? This operation cannot be undone`,
      )
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  });
});

document.querySelectorAll('.action-edit').forEach(($actionEdit) => {
  $actionEdit.addEventListener('click', (e) => {
    const { id, brand, model } = $actionEdit.dataset;
    if (
      !confirm(
        `Confirm that you want to edit the car: ${brand},
         ${model} with ID ${id}? This operation cannot be undone`,
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
