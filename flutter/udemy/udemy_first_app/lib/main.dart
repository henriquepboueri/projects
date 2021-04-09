import 'package:flutter/material.dart';

import './question.dart';
import './answer.dart';

// void main() {
//   runApp(new MyApp());
// }
void main() => runApp(MyApp()); // one expression only

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  var _questionIndex = 0;
  var _questions = [
    'What\'s your favorite color?',
    'What\'s your favorite animal?'
  ];

  void _answerQuestion() {
    setState(() {
      _questionIndex = _questionIndex + 1;
      if (_questionIndex + 1 > _questions.length) {
        _questionIndex = 0;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('My First App'),
        ),
        body: Column(
          children: [
            Question(_questions[_questionIndex]),
            Answer('Answer 1', _answerQuestion),
            Answer('Answer 2', _answerQuestion),
            Answer('Answer 3', _answerQuestion),
          ],
        ),
      ),
    );
  }
}
