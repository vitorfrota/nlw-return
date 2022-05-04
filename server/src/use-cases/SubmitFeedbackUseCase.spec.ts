import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', ()=> {
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example screenshot',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow();
  })

  it('should not be able to submit a feedback without type', ()=> {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    expect(submitFeedback.execute({
      type: '',
      comment: 'Example screenshot',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without comment', ()=> {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback with wrong format screenshot', ()=> {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example screenshot',
      screenshot: 'data:document/pdf'
    })).rejects.toThrow();
  })
})