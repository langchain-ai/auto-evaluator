import { ScrollArea, Spoiler, Table, Text } from "@mantine/core";
import { Result } from "../../utils/types";
import renderPassFail from "../../utils/renderPassFail";

const ExperimentResultsTable = ({
  results,
  isFastGradingPrompt,
}: {
  results: any[];
  isFastGradingPrompt: boolean;
}) => {
  return (
    <ScrollArea scrollbarSize={0}>
      <Table withBorder withColumnBorders striped highlightOnHover>
        <thead>
          <tr>
            <th>Question</th>
            <th>Expected Answer</th>
            <th>Observed Answer</th>
            <th>Retrieval Relevancy Score</th>
            <th>Answer Similarity Score</th>
            <th>Latency (s)</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((result: Result, index: number) => {
            return (
              <tr key={index}>
                <td>{result?.question}</td>
                <td>{result?.answer}</td>
                <td>{result?.result}</td>
                <td style={{ whiteSpace: "pre-wrap" }}>
                  {isFastGradingPrompt ? (
                    renderPassFail(result.retrievalScore)
                  ) : (
                    <Spoiler
                      maxHeight={150}
                      hideLabel={
                        <Text weight="bold" color="blue">
                          Show less
                        </Text>
                      }
                      showLabel={
                        <Text weight="bold" color="blue">
                          Show more
                        </Text>
                      }
                    >
                      {result?.retrievalScore.justification}
                    </Spoiler>
                  )}
                </td>
                <td style={{ whiteSpace: "pre-wrap" }}>
                  {isFastGradingPrompt ? (
                    renderPassFail(result?.answerScore)
                  ) : (
                    <Spoiler
                      maxHeight={150}
                      hideLabel={
                        <Text weight="bold" color="blue">
                          Show less
                        </Text>
                      }
                      showLabel={
                        <Text weight="bold" color="blue">
                          Show more
                        </Text>
                      }
                    >
                      {result?.answerScore.justification}
                    </Spoiler>
                  )}
                </td>
                <td>{result?.latency?.toFixed(3)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </ScrollArea>
  );
};
export default ExperimentResultsTable;
