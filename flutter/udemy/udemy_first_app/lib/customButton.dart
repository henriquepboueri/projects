import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final Function fn;

  CustomButton(this.text, this.fn) {
    this.fn();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(5),
      child: RaisedButton(
        child: Text(this.text),
        onPressed: this.fn,
      ),
    );
  }
}
