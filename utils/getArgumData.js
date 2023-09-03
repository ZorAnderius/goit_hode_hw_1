const getArgumData = (data) => {
  const { name, email, phone } = data;
  if (name && email && phone) {
    return data;
  } else if (name && email && !phone) {
    return { name, email };
  } else if (name && phone && !email) {
    return { name, phone };
  } else if (email && phone && !name) {
    return { email, phone };
  } else if (name && !email && !phone) {
    return { name };
  } else if (email && !name && !phone) {
    return { email };
  } else if (phone && !email && !name) {
    return { phone };
  } else {
    return {};
  }
};

module.exports = getArgumData;
