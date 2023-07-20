Remesh.module

- 生成共享 domainResources 模块， querys, commands, events, 从而共享领域事件和行为


RemeshScope 的实际场景: domainStorage 保活

Remesh.module 和 getDomain 的区别是什么

Remesh.extern 作用是什么，全局模块？ 
注入外部模块，并且领域只需要知道模块的抽象，不关注具体实现。

{get} 既可以 query RemeshStateItem 也可以 query RemeshQueryAction


State 值变更： updateStateItem ===> stateStorage.currentState


需要：

清晰的设计理念

Remesh.extern({}) name 信息丢失



- Remesh.domain => RemeshDomain => getDomain => currentDomainStorage => getter(domainAction.Domain.impl(domainContext, domainAction.arg))

- domain 的上下游点火（触发 effect）可以转移到实际业务中的父子组件关系中?

- domain 的销毁依赖于 refCount, 且会根据依赖关系动态计算并销毁

- useRemeshDomain 的使用问题： 只要组件使用了 useRemeshDomain 且初次渲染都会触发 igniteDomain 逻辑（这似乎是不符合期望的）(没有问题，effect 不会重新触发)