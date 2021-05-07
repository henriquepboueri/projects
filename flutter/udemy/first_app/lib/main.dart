import 'package:flutter/material.dart';

import './answer.dart';
import './question.dart';

void main() {
  var app = MyApp();
  runApp(app);
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  var _questionIndex = 0;
  final _questions = [
    {
      'questionText': 'What\'s your favorite color?',
      'answers': ['Blue', 'Yellow', 'Green', 'Red']
    },
    {
      'questionText': 'What\'s your favorite animal?',
      'answers': ['Dog', 'Cat', 'Pig', 'Chicken']
    },
    {
      'questionText': 'Who\'s your favorite actor?',
      'answers': ['Marlon Brando', 'James Fox', 'Robert De Niro', 'Jackie chan']
    },
  ];

  void _answerQuestion() {
    setState(() {
      if (_questionIndex + 1 == _questions.length) {
        _questionIndex = 0;
      } else {
        _questionIndex = _questionIndex + 1;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    print("_MyAppState called");

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('My App'),
        ),
        body: Column(
          children: [
            Question(_questions[_questionIndex]['questionText']),
            ...(_questions[_questionIndex]['answers'] as List<String>)
                .map((answer) {
              return Answer(answer, _answerQuestion);
            }).toList(),
          ],
        ),
      ),
    );
  }
}
