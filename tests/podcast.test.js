import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { creatPodcast, editPodcast } from "../Controller/podcast.controller.js";
import Podcast from "../Models/podcast.model.js";
import Project from "../Models/project.model.js";

const app = express();
app.use(express.json());
app.use("/api/podcast/:id", creatPodcast);

/// smple  Project model methods
jest.mock("../Models/project.model.js", () => ({
  findById: jest.fn(),
}));

/// smple  Podcast model constructor and its methods
jest.mock("../Models/podcast.model.js", () => {
  const actualModel = jest.requireActual("../Models/podcast.model.js");
  return {
    __esModule: true,
    default: jest.fn(),
    Podcast: actualModel,
  };
});

// testing response
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("create podcast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if title or description are missing", async () => {
    const req = {
      body: { description: "testing description" },
      params: { id: "projectid" },
    };

    const res = mockResponse();

    await creatPodcast(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Title and description are required",
    });
  });

  it("returns 404 if project not found", async () => {
    Project.findById.mockReturnValueOnce(null);
    const req = {
      body: { title: "testing title", description: "testing description" },
      params: { id: "projectid" },
    };
    const res = mockResponse();
    await creatPodcast(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Project not found" });
  });

  it("should create a new podcast", async () => {
    const mockProject = { _id: "projectid", podcast: [], save: jest.fn() };
    Project.findById.mockReturnValueOnce(mockProject);

    const mockPodcast = {
      _id: "podcastid",
      title: "testing title",
      description: "testing description",
      save: jest.fn(),
    };

    Podcast.mockImplementationOnce(() => mockPodcast);

    const req = {
      body: { title: "testing title", description: "testing description" },
      params: { id: "projectid" },
    };
    const res = mockResponse();
    await creatPodcast(req, res);

    expect(Project.findById).toHaveBeenCalledWith("projectid");
    expect(mockProject.podcast).toContain("podcastid");
    expect(mockProject.save).toHaveBeenCalled();
    expect(mockPodcast.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPodcast);
  });



});


// describe("edit podcast ", () => {

//     beforeEach(() => {
//         jest.clearAllMocks();
//       });

//       it('it shold give error if podcast not found', async () => {
//         Podcast.findById.mockReturnValueOnce(null)
//         const req = {
//           body: { title: "testing title", description: "testing description" },
//           params: { id: "podcastid" },
//         };
//         const res = mockResponse();
//         await editPodcast(req, res);
//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({ message: "Podcast not found" });
//       });

//       it("should update an existing podcast", async () => {
//         const mockPodcast = {
//           _id: "podcastid",
//           title: "updated title",
//           description: "updated description",
//           save: jest.fn(),
//         };
    
//         Podcast.findByIdAndUpdate.mockReturnValueOnce(mockPodcast);
    
//         const req = {
//           params: { id: "podcastid" },
//           body: { title: "updated title", description: "updated description" },
//         };
//         const res = mockResponse();
//         await editPodcast(req, res);
    
//         expect(Podcast.findByIdAndUpdate).toHaveBeenCalledWith(
//           "podcastid",
//           { title: "updated title", description: "updated description" },
//           { new: true }
//         );
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith(mockPodcast);
//       });
// })