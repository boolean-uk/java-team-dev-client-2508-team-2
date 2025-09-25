import { API_URL } from './constants';

async function login(email, password) {
  return await post('login', { email, password }, false);
}

async function register(email, password) {
  await post('signup', { email, password }, false);
  return await login(email, password);
}

async function createProfile(userId, firstName, lastName, phone, githubUrl, bio) {
  return await patch(`users/${userId}/profile`, {
    firstName,
    lastName,
    phone,
    githubUrl,
    bio
  });
}

async function createCohort(name, specialisationId, startDate, endDate) {
  return await post('cohorts', {
    name,
    specialisationId,
    startDate,
    endDate
  });
}

async function createUser(user) {
  return await post('users', {
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    githubUrl: user.githubUrl,
    bio: user.bio,
    email: user.email,
    password: user.password,
    roles: user.roles,
    cohortId: Number(user.cohortId),
    specialisationId: Number(user.specialisationId),
    jobTitle: user.jobTitle
  });
}

async function getPosts() {
  const res = await get('posts');
  return res.data.posts;
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth);
}

async function get(endpoint, auth = true) {
  return await request('GET', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method
  };

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    // eslint-disable-next-line dot-notation
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  if (!response.ok) {
    const text = await response.text();
    const dataResponse = text ? JSON.parse(text) : {};
    const errorMessage =
      dataResponse?.data?.message || dataResponse?.message || response.statusText;
    throw new Error(errorMessage);
  }

  return response.json();
}

export { login, getPosts, register, createProfile, createCohort, createUser, get };
