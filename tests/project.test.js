import express from 'express';
import mongoose from 'mongoose';
import { createProject } from '../Controller/project.controller.js';
import Project from '../Models/project.model.js';
import User from '../Models/user.model.js';

const app = express();
app.use(express.json());
app.post('/api/project', createProject);
 
jest.mock('../Models/user.model.js', () => ({
  findById: jest.fn(),
  save: jest.fn()
}));

 
jest.mock('../Models/project.model.js', () => {
  const actualModel = jest.requireActual('../Models/project.model.js');
  return {
    __esModule: true,
    default: jest.fn(),
    Project: actualModel,
  };
});

 
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// Tests for createProject
describe('createProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if title is missing', async () => {
    const req = {
      body: {},
      user: { _id: 'userid' },
    };
    const res = mockResponse();

    await createProject(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Title is required' });
  });

  it('creates a new project and aslo updates the user', async () => {
    const mockUser = { 
      _id: 'userid', 
      projects: [],
      save: jest.fn()
    };

    User.findById.mockReturnValueOnce(mockUser);

    const mockProject = {
      _id: 'projectid',
      title: 'New Project',
      clientId: 'userid',
      save: jest.fn()
    };

    Project.mockImplementationOnce(() => mockProject);

    const req = {
      body: { title: 'New Project' },
      user: { _id: 'userid' },
    };
    const res = mockResponse();

    await createProject(req, res);

    expect(User.findById).toHaveBeenCalledWith('userid');
    expect(mockUser.projects).toContain('projectid');
    expect(mockUser.save).toHaveBeenCalled();
    expect(mockProject.save).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(mockProject);
  });
});
