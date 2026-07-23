import { create } from 'zustand';
import { useCounterStore } from './stores/counterStore';
import { useState } from 'react';

export default function Test() {
  const localCount = useCounterStore((states) => states.count + 1);
  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page for Zustand store.</p>
      <p>localCount: {localCount}</p>
    </div>
  );
}