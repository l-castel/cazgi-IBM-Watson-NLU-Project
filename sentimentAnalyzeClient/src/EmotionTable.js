import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
        let emotionList = Object.entries(this.props.emotions.emotion);
        let emotionTable = emotionList.map((emotion)=> {
            return <tr>
                <td >{emotion[0]} </td>
                <td > {emotion[1]} </td>
            </tr>
        });
      return (
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                emotionTable
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
            }
            </tbody>
          </table>
          </div>
          );
        }

}
export default EmotionTable;
