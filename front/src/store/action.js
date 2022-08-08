import ACTypes from "./types";

export const sendCorrectAnswer = (answer, id, topicId) => ({
  type: ACTypes.CORRECT_ANSWER,
  payload: { answer, id, status: 'correct', topicId}
});

export const sendWrongAnswer = (answer, id, topicId) => ({
  type: ACTypes.WRONG_ANSWER,
  payload: { answer, id, status: 'wrong', topicId}
});
