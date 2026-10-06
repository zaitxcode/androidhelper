import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_example/main.dart';

void main() {
  testWidgets('Android Helper demo renders core controls', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MyApp());

    expect(find.text('AppHelper Demo'), findsOneWidget);
    expect(find.byType(TextField), findsOneWidget);
    expect(find.text('Network'), findsOneWidget);
    expect(find.text('Connection Details'), findsOneWidget);
    expect(find.byType(InkWell), findsWidgets);

    await tester.tap(find.text('Connection Details'));
    await tester.pump();
  });
}
