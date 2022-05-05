import { SubmitFeedbackUseCase } from "./submit-feedback-use-cases";

const creatFeedbackSpy = jest.fn();
const sendMailFeedbackSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: creatFeedbackSpy },
  { sendMail: sendMailFeedbackSpy }
);

describe("Submit feedback", () => {
  it("Should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example text",
        screenshot: "data:image/png;base64/bgotxerzyfyuf",
      })
    ).resolves.not.toThrow();

    expect(creatFeedbackSpy).toHaveBeenCalled();
    expect(sendMailFeedbackSpy).toHaveBeenCalled();
  });

  it("Should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example text",
        screenshot: "data:image/png;base64/bgotxerzyfyuf",
      })
    ).rejects.toThrow();
  });

  it("Should not be able to submit a feedback without coment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64/bgotxerzyfyuf",
      })
    ).rejects.toThrow();
  });

  it("Should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "ta tudo bugado",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
