import QuestionField from "./QuestionField";

function QuestionForm({ questions, answers, onChange }) {
  return (
    <div>
      {questions.map((question) => (
        <QuestionField
          key={question.field}
          question={question}
          value={answers[question.field]}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export default QuestionForm;