let status = 'home'; // home, order, menuselect

function setPageStatus(value) {
  status = value;
}

function getPageStatus() {
  return status;
}

export { setPageStatus, getPageStatus }