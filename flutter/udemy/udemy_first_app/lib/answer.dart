import 'package:flutter/material.dart';

class Answer extends StatelessWidget {
  final String btnLabel;
  final Function btnFn;
  Answer(this.btnLabel, this.btnFn);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.all(5),
      child: RaisedButton(
        color: Colors.blue,
        child: Text(btnLabel),
        onPressed: () {
          btnFn();
          print('${this.btnLabel} is the chosen answer!');
        },
      ),
    );
  }
}
