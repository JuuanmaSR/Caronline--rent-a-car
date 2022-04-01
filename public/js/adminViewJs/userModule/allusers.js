/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
document.querySelectorAll('.action-edit-user').forEach(($actionEdit) => {
  $actionEdit.addEventListener('click', (e) => {
    const { id, fullname } = $actionEdit.dataset;
    if (
      !confirm(
        `Confirm that you want to edit the User: ${fullname} with ID ${id}? This operation cannot be undone`,
      )
    ) {
      e.preventDefault();
      return false;
    }
    return true;
  });
});

document.querySelectorAll('.action-delete').forEach(($actionEdit) => {
  $actionEdit.addEventListener('click', (e) => {
    const { id, fullname } = $actionEdit.dataset;
    if (
      !confirm(
        `Confirm that you want to delete the User: #${id}-${fullname} ? This operation cannot be undone`,
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
