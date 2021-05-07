import 'package:flutter/material.dart';

class Answer extends StatelessWidget {
  final String text;
  final Function cb;
  const Answer(this.text, this.cb);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: RaisedButton(
        color: Colors.blue,
        textColor: Colors.white,
        child: Text(text),
        onPressed: cb,
      ),
    );
  }
}
