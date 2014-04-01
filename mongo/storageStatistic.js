function event(count, messageLen) {

	print("T3100 Event count: " + count);
	var aLongStr = "1111111111222222222233333333334444444444555555555566666666667777777777888888888899999999990000000000" +
			"1111111111222222222233333333334444444444555555555566666666667777777777888888888899999999990000000000" +
			"1111111111222222222233333333334444444444555555555566666666667777777777888888888899999999990000000000";
	var message= aLongStr.substring(0, messageLen);
	var date = new Date();
	for (i = 0; i < count; i++) {
		db.ems.MgmtEvent.insert({
					"_id" : new ObjectId(),
					"eventId" : 1450803,
					"type" : 1,
					"timeStamp" : new Date(date.getTime() + i),
					"emsReceiveTime" : ISODate("2013-01-23T17:07:27.450Z"),
					"severity" : 2,
					"message" : message,
					"originOid" : "system.System~20"
				});
	}
}

function t3100SystemPerf(count) {

	print("T3100 system perf count: " + count);
	var date = new Date();
	for (i = 0; i < count; i++) {
		var newDate = new Date(date.getTime() + i);
		db.t3100.AdaptiveOptimizationSNMPData.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"uxiVideoNonAdaptiveLossyTransactionCount" : NumberLong(13),
			"uxiVideoAdaptiveLosslessTransactionCount" : NumberLong(13),
			"uxiVideoAdaptiveLossyTransactionCount" : NumberLong(98),
			"uxiVideoOtherLosslessTransactionCount" : NumberLong(16),
			"uxiWebNonAdaptiveOptImageTransactionCount" : NumberLong(38),
			"uxiWebAdaptiveNoOptImageTransactionCount" : NumberLong(76),
			"uxiWebAdaptiveOptImageTransactionCount" : NumberLong(91),
			"uxiWebOtherNoOptImageTransactionCount" : NumberLong(19),
			"uxiWebPageUnitCount" : NumberLong(35),
			"uxiWebNormalizedPageUnitTime" : NumberLong(73),
			"system_id" : "system.System~20"
		});
		db.t3100.HttpData.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"httpRequestClientCount" : NumberLong(85),
			"httpRequestServerCount" : NumberLong(8),
			"httpWebRequestCacheHitCount" : NumberLong(91),
			"httpWebCacheHitOctets" : NumberLong(59),
			"httpErrorServerResponse4xxCount" : NumberLong(73),
			"httpErrorServerResponse5xxCount" : NumberLong(15),
			"httpErrorClientResponse5xxCount" : NumberLong(35),
			"httpAverageTransactionTime" : 0.253955614069572,
			"system_id" : "system.System~20"
		});
		db.t3100.MediaOptimizationData.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"mediaRequestCount" : NumberLong(22),
			"mediaServerInOctets" : NumberLong(16),
			"mediaClientOutOctets" : NumberLong(69),
			"mediaActiveLosslessSessionCount" : 7,
			"mediaActiveLossySessionCount" : 10,
			"bypassedLossyMediaOptimizationRequests" : NumberLong(52),
			"mediaOptimizationErrors" : 10,
			"bypassedLimitedMemoryRequests" : NumberLong(97),
			"system_id" : "system.System~20"
		});
		db.t3100.ProxyData.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"clientInProxyOctets" : NumberLong(99),
			"clientOutProxyOctets" : NumberLong(40),
			"serverInProxyOctets" : NumberLong(38),
			"serverOutProxyOctets" : NumberLong(11),
			"proxyCummulativeAcceptedConnections" : NumberLong(60),
			"proxyCummulativeInitiatedConnections" : NumberLong(48),
			"proxyInitiatedConnectionsError" : 62,
			"proxyActiveAcceptedConnections" : 3,
			"proxyActiveInitiatedConnections" : 69,
			"system_id" : "system.System~20"
		});

		db.t3100.SessionDbData.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"sdbSessionPullCount" : 31,
			"sdbSessionPullAverageTime" : 77,
			"sdbSessionPullErrorCount" : 11,
			"sdbActiveSessionCount" : 57,
			"system_id" : "system.System~20"
		});
		db.t3100.DataTrafficData.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"clientInOctets" : NumberLong(25),
			"clientInError" : NumberLong(52),
			"clientOutOctets" : NumberLong(50),
			"clientOutError" : NumberLong(94),
			"serverInOctets" : NumberLong(23),
			"serverInError" : NumberLong(67),
			"serverOutOctets" : NumberLong(31),
			"serverOutError" : NumberLong(71),
			"system_id" : "system.System~20"
		});
		db.t3100.MediaCacheData.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"mediaCacheUnoptimizedOctets" : NumberLong(73),
			"mediaCacheOptimizedOctets" : NumberLong(95),
			"mediaCacheHitCount" : NumberLong(32),
			"mediaCacheBypassCount" : NumberLong(56),
			"system_id" : "system.System~20"
		});
		db.t3100.PCRFData.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"establishedSesssionCount" : NumberLong(87),
			"activeSesssionCount" : NumberLong(17),
			"updatedSesssionCount" : NumberLong(80),
			"removedSesssionCount" : NumberLong(50),
			"incomingRequestCount" : NumberLong(18),
			"outGoingRequestCount" : NumberLong(13),
			"averageResponseTime" : 0.9189201374140514,
			"transactionErrorEncountered" : NumberLong(76),
			"system_id" : "system.System~20"
		});
		db.t3100.RadiusData.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"radiusStartMessageCount" : NumberLong(29),
			"radiusStopMessageCount" : NumberLong(85),
			"radiusInterimMessageCount" : NumberLong(85),
			"radiusErrorCount" : NumberLong(94),
			"system_id" : "system.System~20"
		});
		db.t3100.SystemResourceUsage.insert({
			"_id" : new ObjectId(),
			"time" : newDate,
			"asmCpuAverage" : 90,
			"asmMemoryAverage" : 88,
			"system_id" : "system.System~20"
		});
	}
}

function t2100Perf(count) {

	print("T2100 perf count: " + count);
	var date = new Date();
	for (i = 0; i < count; i++) {
		db.t2100.SystemResourceUsage.insert({
			"_id" : new ObjectId(),
			"time" : new Date(date.getTime() + i),
			"diskUsage" : 30,
			"memoryUsage" : 49,
			"cpuUsage" : 21,
			"cpuUsageOverLastMin" : 95,
			"system_id" : "system.System~20"
		});
		db.t2100.CacheStatistics.insert({
			"_id" : new ObjectId(),
			"time" : new Date(date.getTime() + i),
			"totalWRError" : NumberLong(54),
			"totalWriteRequest" : NumberLong(5),
			"totalBytesWritten" : NumberLong(39),
			"totalReadRequest" : NumberLong(88),
			"totalBytesRead" : NumberLong(94),
			"system_id" : "system.System~20"
		});

	}
}

function t3100CsmPerf(count) {

	print("T3100 CSM perf count: " + count);
	var date = new Date();
	for (i = 0; i < count; i++) {
		db.t3100.CsmResourceUtilData.insert({
			"_id" : new ObjectId(),
			"time" : new Date(date.getTime() + i),
			"bladeCsmUtilizationCpuAverage" : 68,
			"bladeCsmUtilizationMemory" : 32,
			"bladeCsmDiskPercent1" : 76,
			"bladeCsmDiskPercent2" : 97,
			"chassisComponent_id" : "inventory.ChassisComponent~142~1~4~7"
		});
	}
}

function t3100AsmPerf(count) {

	print("T3100 ASM perf count: " + count);
	var date = new Date();
	for (i = 0; i < count; i++) {
		db.t3100.AsmResourceUtilData.insert({
			"_id" : new ObjectId(),
			"time" : new Date(date.getTime() + i),
			"bladeAsmUtilizationCpuAverage" : 45,
			"bladeAsmUtilizationMemory" : 48,
			"chassisComponent_id" : "inventory.ChassisComponent~142~1~0~3"
		});
	}
}

function getSize(bytes) {
	return bytes/1024.0/1024.0+ "MB == " + bytes/1024.0/1024.0/1024.0 + "GB";
}

function printStatistic() {
	print("EMS database statistic in MB:");
	printjson(db.stats(1024*1024));
	var stat = db.stats();
	print("EMS data file size: " + getSize(stat.fileSize));
}

function main() {
	
	var eventCount = (t3100Count + t2100Count) * eventDays * 24 * 3600.0/10;
	if(disableEvent) {
		eventCount = 0;
	}
	var t3100SysPerfCount = t3100Count * perfDays * 24 * 60.0/perfInterval;
	if(disableSysPerf) {
		t3100SysPerfCount = 0;
	}
	var t3100CsmPerfCount = t3100Count * csmPerT3100 * perfDays * 24  * 60.0/perfInterval;
	var t3100AsmPerfCount = t3100Count * asmPerT3100 * perfDays *  24  * 60.0/perfInterval;
	var t2100PerfCount = t2100Count * perfDays * 24  * 60.0/perfInterval;
	
	print("Number of T3100: " + t3100Count);
	print("Number of CSM per T3100: " + csmPerT3100);
	print("Number of ASM per T3100: " + asmPerT3100);
	print("Number of T2100: " + t2100Count);
	print("Poll perf every " + perfInterval + " minutes and save for " + perfDays + " days");
	print("Generate event every " + eventInterval + " seconds and save for " + eventDays + " days");
	print("Average event message length: " + eventMsgLen);
	
	printStatistic();
	
	event(eventCount, eventMsgLen);
	t3100SystemPerf(t3100SysPerfCount);
	t3100CsmPerf(t3100CsmPerfCount);
	t3100AsmPerf(t3100AsmPerfCount);
	t2100Perf(t2100PerfCount);
	
	printStatistic();
}

var t3100Count=8
var t2100Count=8
var csmPerT3100=2
var asmPerT3100=10
var disableSysPerf=false
var disableEvent=false
// configurations for both T3100 and T2100
var perfDays=90 // perf save days
var perfInterval=5 // in minutes
var eventDays=90 // event save days
var eventInterval=10 // in seconds
var eventMsgLen=100 // event message length

main();
